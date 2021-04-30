export interface Libro {
    _id?: any;
    nombreLibro: String;
    genero: String;
    autor: String;
    precio: String;
    participantes: String[];
    //imagen: string
}

export interface RootLibro {
    //nos llega un array que tiene varios tipos - any. 
    //Al decir que tiene varios tipos any en perfil.page.ts se puede hacer la transformacion a tipo libro
    libro: any[];
    mensaje: String;
    status: String;
    token: String;
}