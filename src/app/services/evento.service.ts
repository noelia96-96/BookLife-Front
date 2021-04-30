import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RespuestaPost } from '../interfaces/RespuestaPost';
import {Plugins} from '@capacitor/core';
import { RootEvento } from '../interfaces/evento';
import { Evento } from 'src/app/interfaces/evento';

const {Storage} = Plugins;
@Injectable({
  providedIn: 'root'
})

export class EventoService {
      constructor(private _http:HttpClient) { }
      //todos los eventos
      public idEventoModificar : String;
      public eventoModificar : Evento;
      public eventoBorrar : Evento;
      public eventoIdBorrar : String;
      public eventosPropios : Evento[];
      //public eventosAjenos : Evento[];

      registrarEvento(dato:any){
      return new Promise<any>((resolve, reject)=>{
        this._http.post(`${environment.urlEvento}registrar`,dato).subscribe((resp:any)=>{
          if(resp.status=='ok'){
            this.eventosPropios.unshift(resp.evento);
          }
            resolve(resp);
        });
      });
    }

    //Traer los eventos de la bbdd
    async getEventos(limit:number){
      let datos = {
        limite: limit,
      }
      return new Promise<RootEvento>(resolve=>{
        this._http.post<RootEvento>(`${environment.urlEvento}mostrarEvento`,datos).subscribe(resp=>{
          this.eventosPropios=resp.evento[0];
      resolve(resp);
     });
   });
 }

 borrar(){
  for(let data of this.eventosPropios){
    if(data._id == this.eventoIdBorrar){
      this.eventoBorrar = data;
    }
  }
  return new Promise<any>(resolve=>{
    const datos = {
      _id: this.eventoBorrar._id,
    }
    this._http.post(`${environment.urlEvento}borrarEvento`,datos).subscribe((resp:RespuestaPost)=>{
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

 apuntarse(datos:any){
  return new Promise<any>(resolve=>{
    this._http.post(`${environment.urlEvento}apuntarse`,datos).subscribe((resp:any)=>{
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

 desapuntarse(datos:any){
 return new Promise<any>(resolve=>{
   this._http.post(`${environment.urlEvento}desapuntarse`,datos).subscribe((resp:any)=>{
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
buscarEvento(){
  for(let data of this.eventosPropios){
    if(data._id == this.idEventoModificar){
      this.eventoModificar = data;
    }
  }
 return this.eventoModificar;

}

guardarDatosEditados(){
  return new Promise<any>(resolve=>{
    this._http.post(`${environment.urlEvento}guardar`,this.eventoModificar).subscribe((resp:any)=>{
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

}


  