import { UsuarioService} from './../services/usuario.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _usuarioService:UsuarioService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
    
    //Si modifico la req, debe clonarla, no se puede append nada a esa req
    //cuando llega peticion http muestra el login.
    //mete la cabecera si hay token
 
    //this._mensajeService.muestraLoading();
    
  return from(this._usuarioService.getToken())
    .pipe(
      switchMap(token => {
         const headers = req.headers.set('Authorization', 'Bearer ' + token['value'])
         const requestClone = req.clone({
           headers 
          });
        return next.handle(requestClone);
      })
     );;
      
      
      //FORMA MÁS LARGA
      
      /*return next.handle(tokenizeRequest).pipe(
        //cuando termina la peticion se oculta el login
        finalize(() => {
          //this._mensajeService.ocultaLoading();

        })
      );
    }
    //si no hay loading devuelve la peticion pasando el pipe de que cuando finalice se oculte el login
    return next.handle(req).pipe(
      finalize(() => {
          //this._mensajeService.ocultaLoading();
      })
    );*/
  }
}
