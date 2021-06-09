import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RespuestaPost } from '../interfaces/RespuestaPost';
import {Plugins} from '@capacitor/core';
import { RootLibro } from '../interfaces/libro';
import { Libro } from 'src/app/interfaces/libro';

const {Storage} = Plugins;
@Injectable({
  providedIn: 'root'
})

export class LibroService {
      constructor(private _http:HttpClient) { }
      //todos los libros
      public idLibroModificar : String;
      public libroModificar : Libro;
      public libroBorrar : Libro;
      public libroIdBorrar : String;
      public librosPropios : Libro[];
      public libroCardPinchada : any;

      registrarLibro(dato:any){
      return new Promise<any>((resolve, reject)=>{
        this._http.post(`${environment.urlLibro}registrarLibro`,dato).subscribe((resp:any)=>{
          if(resp.status=='ok'){
            //this.librosPropios.unshift(resp.libro);
          }
            resolve(resp);
        });
      });
    }

    //Traer los libros de la bbdd
    async getLibros(limit:number){
      let datos = {
        limite: limit,
      }
      return new Promise<RootLibro>(resolve=>{
        this._http.post<RootLibro>(`${environment.urlLibro}mostrarLibro`,datos).subscribe(resp=>{
          this.librosPropios=resp.libro[0];
      resolve(resp);
     });
   });
 }

//Mostrar libros al bibliofilo
 mostrarLibros(limit:number){
    let datos = {
        limite: limit,
      }
       return new Promise<RootLibro>(resolve=>{
        this._http.post<RootLibro>(`${environment.urlLibro}mostrarLibrosBibliofilo`,datos).subscribe(resp=>{
          this.librosPropios=resp.libro[0];
      resolve(resp);
     });
   });

 }

 borrar(){
  for(let data of this.librosPropios){
    if(data._id == this.libroIdBorrar){
      this.libroBorrar = data;
    }
  }
  return new Promise<any>(resolve=>{
    const datos = {
      _id: this.libroBorrar._id,
    }
    this._http.post(`${environment.urlLibro}borrarLibro`,datos).subscribe((resp:RespuestaPost)=>{
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

buscarLibro(){
  for(let data of this.librosPropios){
    if(data._id == this.idLibroModificar){
      this.libroModificar = data;
    }
  }
 return this.libroModificar;

}

guardarDatosEditados(){
  return new Promise<any>(resolve=>{
    this._http.post(`${environment.urlLibro}guardar`,this.libroModificar).subscribe((resp:any)=>{
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

reservarLibro(datos:any){
  return new Promise<any>(resolve=>{
    this._http.post(`${environment.urlLibro}reservarLibro`,datos).subscribe((resp:any)=>{
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

quitarReservaLibro(datos:any){
  return new Promise<any>(resolve=>{
   this._http.post(`${environment.urlLibro}quitarReservaLibro`,datos).subscribe((resp:any)=>{
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

//Mostrar las librerias al pinchar en la card de la libreria
mostrarLibrosPicharCard(limit:number, libreriaPinchada:string){
  let datos = {
    limite: limit,
    libreriaPinchadaCard: libreriaPinchada
   }
    return new Promise<RootLibro>(resolve=>{
     this._http.post<RootLibro>(`${environment.urlLibro}mostrarLibrosPicharCard`,datos).subscribe(resp=>{
      this.libroCardPinchada = resp.libro[0];
   resolve(resp);
  });
});
}

}

