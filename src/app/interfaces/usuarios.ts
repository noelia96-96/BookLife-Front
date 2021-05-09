export interface usuarios {
    _id?:any;
    nombre:String;
    ciudad:String;
    direccion?:String;
    telefono?:Number;
    web?:String;
    email:String;
    pwd:String;
    sexo?:String;
}

export interface RootUsuarios {
    //nos llega un array que tiene varios tipos - any. 
    //Al decir que tiene varios tipos any en perfil.page.ts se puede hacer la transformacion a tipo usuarios
    usuario: any[];
    mensaje: String;
    status: String;
    token: String;
}