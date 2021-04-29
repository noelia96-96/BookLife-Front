import { Time } from '@angular/common';
export interface Evento {
    _id?: any;
    nombreEvento: String;
    creador: string;
    fecha: Date;
    lugar: string;
    hora: Date;
    participantes: String[];
    //imagen: string
}

export interface RootEvento {
    //nos llega un array que tiene varios tipos - any. 
    //Al decir que tiene varios tipos any en perfil.page.ts se puede hacer la transformacion a tipo evento
    evento: any[];
    mensaje: String;
    status: String;
    token: String;
}
