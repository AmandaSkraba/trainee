import { Readable } from "node:stream";
import { PosicionamentoType } from "../../shared/types/posicionamento.type";
import { parse } from 'csv-parse';
import { EncontroType } from "../../shared/types/encontro-response.type";
import { DeterminarProximidade, Haversine } from "../../shared/utils/formulas.util";
import { SalvarJson } from "../../shared/utils/arquivo.util";

export class DatasetService {


    constructor() { }

    public async processarDataset(stream: Readable, nomeArquivo: string): Promise<EncontroType[]> {
        const agrupamento = new Map<string, PosicionamentoType[]>();
        const encontrosConfirmados: EncontroType[] = [];//private encontrosConfirmados json <Array<EncontroType>>

        const parser = stream.pipe(
            parse({
                delimiter: ';',
                columns: true,
                skip_empty_lines: true,
                trim: true
            })
        );

        for await (const record of parser) {
            const posicionamento: PosicionamentoType = {
                idMonitorado: parseInt(record.idMonitorado),
                faccaoMonitorado: record.faccaoMonitorado ? parseInt(record.faccaoMonitorado) : null,
                latitude: parseFloat(record.latitude),
                longitude: parseFloat(record.longitude),
                timestamp: record.timestamp,
                medidaProtetiva: record.medidaProtetiva === 'true',
                idsRestricaoMedida: record.idsRestricaoMedida ? record.idsRestricaoMedida.split(',').map((id: string) => parseInt(id)) : []
            }

            this.determinarHorario(agrupamento, posicionamento);
        }

        this.eliminarPosicionamentosUnicos(agrupamento);
        this.determinarEncontros(agrupamento, encontrosConfirmados);

        this.salvarArquivo(nomeArquivo, encontrosConfirmados);
        return encontrosConfirmados;
    };


    private determinarHorario(agrupamento: Map<string, PosicionamentoType[]>, posicionamento: PosicionamentoType) {
        const horario = posicionamento.timestamp; //pega horário do posicionamento
        const posicionamentos = agrupamento.get(horario); // busca a chave com horário

        if (posicionamentos) { //chave existe? atribui +1
            posicionamentos.push(posicionamento);
        } else { // não existe? cria chave e atribui
            agrupamento.set(horario, [posicionamento]);
        }
    }

    private eliminarPosicionamentosUnicos(agrupamento: Map<string, PosicionamentoType[]>) {
        agrupamento.forEach((posicionamentos, horario) => {
            if (posicionamentos.length <= 1) {
                agrupamento.delete(horario);
            }
        })//receber o dictionary de posicionamentos e eliminar os que não possuem pares
    }
    //agrupamento -> todos

    private determinarEncontros(agrupamento: Map<string, PosicionamentoType[]>, encontrosDetectados: EncontroType[]) {
        for (const [, posicionamentos] of agrupamento) {

            for (let i = 0; i < posicionamentos.length; i++) {

                for (let j = i + 1; j < posicionamentos.length; j++) {

                    const primeiro = posicionamentos[i];
                    const segundo = posicionamentos[j];

                    // Testar primeiro contra segundo
                    this.validarEncontro(primeiro, segundo, encontrosDetectados);
                }
            }
        }
    }//receber o dictionary de posicionamentos e determinar os encontros

    private validarEncontro(posicao1: PosicionamentoType, posicao2: PosicionamentoType, encontrosDetectados: EncontroType[]) {
        const distancia = Number(DeterminarProximidade([posicao1.latitude, posicao1.longitude], [posicao2.latitude, posicao2.longitude]));

        if (distancia <= 20) {
            encontrosDetectados.push({
                tipo: this.determinarTipoDoEncontro(posicao1, posicao2),
                monitoradosEncontro: [posicao1.idMonitorado, posicao2.idMonitorado],
                timestamp: posicao1.timestamp,
                posicoes: {
                    [posicao1.idMonitorado]: {
                        lat: posicao1.latitude,
                        lon: posicao1.longitude
                    },
                    [posicao2.idMonitorado]: {
                        lat: posicao2.latitude,
                        lon: posicao2.longitude
                    }
                },
                distanciaMetros: distancia,
            } as EncontroType);
        }
    } //receber 2 pessoas e determinar se elas estão em encontro, considerando a distância e o tempo

    private determinarTipoDoEncontro(posicao1: PosicionamentoType, posicao2: PosicionamentoType) {

        if (posicao1.faccaoMonitorado != null &&
            posicao1.faccaoMonitorado === posicao2.faccaoMonitorado)
            return 'faccao'; //posicao 1 é de faccao? facções iguais?

        if (posicao1.idsRestricaoMedida.includes(posicao2.idMonitorado) ||
            posicao2.idsRestricaoMedida.includes(posicao1.idMonitorado))
            return 'protetiva'; //posicao 1 tem o 2 como  restricao? ou inverso, posicao 2 tem o 1 restricao?

        return 'generico';
    }

    private salvarArquivo(nomeArquivo: string, encontrosConfirmados: EncontroType[]) {
        SalvarJson(nomeArquivo, encontrosConfirmados);
    }


}