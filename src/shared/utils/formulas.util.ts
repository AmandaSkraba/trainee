type Coordenada = [lat: number, lon: number];


/** Retorna o delta de dois valores. Exemplo: Δφ = φ2 - φ1; DeltaValue(9, 10) => 1 */
export function Delta(value1: number, value2: number): number {
    return value2 - value1;
}

/** Calcula radiano. Utiliza a formula RAD = (x * PI) / 180; sendo PI aproximadamente (3,1415...) */
export function Radiano(value: number): number {
    return value * Math.PI / 180.0;
}

/*Calcula Seno*/
export function Seno(value: number): number {
    return Math.sin(value);
}

/*Calcula Cosseno*/
export function Cosseno(value: number): number {
    return Math.cos(value);
}

//Calcula raiz quadrada
export function Raiz(value: number): number {
    return Math.sqrt(value);
}

/** CCalcula Haversine -> 
 * a = seno²(Δφ/2) + cos(φ1) * cos(φ2) * seno²(Δλ/2) */
export function Haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const deltas = { lat: Radiano(Delta(lat1, lat2)), lon: Radiano(Delta(lon1, lon2)) }  // calcula deltas da latitude e longitude e transforma em radians para calcular

    const senos = { lat: Seno(deltas.lat / 2), lon: Seno(deltas.lon / 2) }; //calcula senos de latitude Δφ e longitude Δλ

    const a = Math.pow(senos.lat, 2) + Cosseno(Radiano(lat1)) * Cosseno(Radiano(lat2)) * Math.pow(senos.lon, 2); //Haversine

    const c = 2 * Math.atan2(Raiz(a), Raiz(1 - a)); // determina o angulo
    const d = Number((6371000).toPrecision(18)) * c; // determina o angulo

    const result = Math.trunc(d * 1e16) / 1e16
    return Number(result.toFixed(15)); // multiplica pelo raio da terra para determinar a distÂncia - 15 casas decimais.
}

export function DeterminarProximidade(coordenada1: Coordenada, coordenada2: Coordenada): number {
    return Haversine(coordenada1[0], coordenada1[1], coordenada2[0], coordenada2[1]);
}