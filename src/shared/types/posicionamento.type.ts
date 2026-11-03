export interface PosicionamentoType {
    idMonitorado: number;
    faccaoMonitorado: number | null;
    timestamp: string;
    latitude: number;
    longitude: number;
    medidaProtetiva: boolean;
    idsRestricaoMedida: number[];
}