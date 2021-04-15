


export interface RespuestaPost{
    status: string,
    mensaje: string,
    usuario?: any,
    error?:any,
    token?:string
    eventos?: Evento[];
}

export interface Evento {
    //_id?: any;
    nombreEvento: string;
    creador: string;
    fecha: Date;
    participantes: string[];
    //imagen: string
}

//poner las cosas de cuando pidan que traiga evento