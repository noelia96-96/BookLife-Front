import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RespuestaPost } from '../interfaces/RespuestaPost';
import {Plugins} from '@capacitor/core';
const {Storage} = Plugins;
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
public usuarioActual:any;

  guardar: any;
  constructor(private _http:HttpClient) { }

  //Metodo para llamar al servidor

  probandoGet(dato:any){
    return new Promise<any>(resolve =>{
      this._http.get(`${environment.urlUsuario}postDePrueba`,dato).subscribe(resp=>{
          resolve(resp);
      });
    });
  }

  registro(dato:any){
    return new Promise<any>((resolve, reject)=>{
      this._http.post(`${environment.urlUsuario}registro`,dato).subscribe((resp:RespuestaPost)=>{
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
}



