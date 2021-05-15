import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RespuestaPost } from '../interfaces/RespuestaPost';
import {Plugins} from '@capacitor/core';
import { RootUsuarios } from '../interfaces/usuarios';
import { usuarios } from 'src/app/interfaces/usuarios';

const {Storage} = Plugins;
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
constructor(private _http:HttpClient) { }
public usuarioActual:any;
public guardar: any;
public usuario : usuarios[];
public usuarioLibreria : usuarios[];
public usuariosPropios : usuarios[];
public idUsuarioModificar : String;
public usuarioModificar : usuarios;

  registro(dato:any){
    return new Promise<any>((resolve, reject)=>{
      this._http.post(`${environment.urlUsuario}registro`,dato).subscribe((resp:RespuestaPost)=>{
          resolve(resp);
      });
    });
  }

   registroLibreria(dato:any){
     console.log(dato)
    return new Promise<any>((resolve, reject)=>{
      this._http.post(`${environment.urlUsuario}registroLibreria`,dato).subscribe((resp:RespuestaPost)=>{
          resolve(resp);
      });
    });
  }

  login(dato:any){
    return new Promise<any>(resolve=>{
      this._http.post(`${environment.urlUsuario}login`,dato).subscribe((resp:RespuestaPost)=>{
        if(resp.status=='ok' && resp.token){
          Storage.set({
            key:'token',
            value:resp.token
          });
        }
          resolve(resp);
      });
    });
  }
  getToken(){
    return new Promise(resolve=>{
      Storage.get({key:'token'}).then(data=>{
     resolve(data);
    });
    
    });
  }
  async compruebaSiLogado(){
    return new Promise(async resolve=>{
    
      this._http.get(`${environment.urlUsuario}getUsuario`,)
      .subscribe((resp:RespuestaPost) =>{
        if(resp.status=='ok'){
          Storage.set({
            key:'token',
            value:resp.token
          });
          this.usuarioActual = resp.usuario;
          resolve(true);
        }
        else{
         Storage.clear();

          resolve(false);
        }
        
      });
    })
    
  }
  cerrarSesion() {
    Storage.clear();
  }

  buscarUsuario(){
  for(let data of this.usuario){
    if(data._id == this.idUsuarioModificar){
      this.usuarioModificar = data;
    }
  }
 return this.usuarioModificar;
}

 //Traer los usuarios de la bbdd
  mostrarUsuario(){
      return new Promise<RootUsuarios>(resolve=>{
        this._http.get<RootUsuarios>(`${environment.urlUsuario}mostrarUsuario`).subscribe(resp=>{
          this.usuario=resp.usuario;
          console.log(this.usuario)
      resolve(resp);
     });
   });
 }

 // Traer los usuarios tipo libreria de la bbdd
  mostrarLibreria(limit:number){
     let datos = {
        limite: limit,
      }
      return new Promise<RootUsuarios>(resolve=>{
        this._http.post<RootUsuarios>(`${environment.urlUsuario}mostrarLibreria`,datos).subscribe(resp=>{
          this.usuarioLibreria=resp.usuario[0];
          console.log(this.usuarioLibreria)
      resolve(resp);
     });
   });
 }

//Guardar datos personales editados de la libreria
guardarDatosEditadosLibreria(){ 
  console.log(this.usuario[0][0]);
  return new Promise<any>(resolve=>{
    this._http.post(`${environment.urlUsuario}guardar-datos-editados-libreria`,this.usuario[0][0]).subscribe((resp:any)=>{
      if(resp.status=='ok' && resp.token){
        Storage.set({
          key:'token',
          value:resp.token
        });
      }
        resolve(resp);
    });
  });
}

//Guardar datos personales editados del bibliofilo
guardarDatosEditadosBibliofilo(){ 
  return new Promise<any>(resolve=>{
    this._http.post(`${environment.urlUsuario}guardar-datos-editados-bibliofilo`,this.usuario[0][0]).subscribe((resp:any)=>{
      if(resp.status=='ok' && resp.token){
        Storage.set({
          key:'token',
          value:resp.token
        });
      }
        resolve(resp);
    });
  });
}

//Guardar la libreria en favoritos
guadarLibreriaFav(libreria){
  let datos = {
       libreria:libreria,
      }
    console.log(datos);
   return new Promise<any>(resolve=>{
    this._http.post(`${environment.urlUsuario}guadarLibreriaFav`,datos).subscribe((resp:any)=>{
      resolve(resp);
    });
  });
}

//Borrar la libreria de favoritos
borrarLibreriaFav(libreria){
   let datos = {
       libreria:libreria,
      }
    console.log(datos);
   return new Promise<any>(resolve=>{
    this._http.post(`${environment.urlUsuario}borrarLibreriaFav`,datos).subscribe((resp:any)=>{
      resolve(resp);
    });
  });

}

//Mostrar las librerias favoritas en apartado Favoritos
mostrarLibrosFavoritos(limit:number){
     let datos = {
        limite: limit,
      }
       return new Promise<RootUsuarios>(resolve=>{
        this._http.post<RootUsuarios>(`${environment.urlUsuario}mostrarLibrosFavoritos`,datos).subscribe(resp=>{
          this.usuarioLibreria=resp.usuario[0];
          console.log(this.usuarioLibreria)
      resolve(resp);
     });
   });
}

}



