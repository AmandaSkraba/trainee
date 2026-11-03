import { PosicaoEncontroType } from "./posicoes-encontro.type";

export type TipoEncontroType = 'generico' | 'faccao' | 'protetiva';

export interface EncontroType {
    tipo: TipoEncontroType;
    monitoradosEncontro: number[];
    timestamp: string;
    posicoes: Record<number, PosicaoEncontroType>;
    distanciaMetros: number;
}