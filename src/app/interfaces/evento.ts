export interface Evento {
    _id?: any;
    nombreEvento: String;
    creador: String;
    fecha: Date;
    direccion: String;
    ciudad: String;
    hora: Date;
    participantes: String[];
    imagenEvento?: String
}

export interface RootEvento {
    //nos llega un array que tiene varios tipos - any. 
    //Al decir que tiene varios tipos any en perfil.page.ts se puede hacer la transformacion a tipo evento
    evento: any[];
    mensaje: String;
    status: String;
    token: String;
}
