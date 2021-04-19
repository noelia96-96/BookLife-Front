import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './seleccion-registro.page.html',
  styleUrls: ['./seleccion-registro.page.scss'],
})
export class SeleccionRegistroPage implements OnInit {

  constructor(private _usuarioService:UsuarioService, private _router:Router) { }
  

  ngOnInit() {
  }

  registroBibliofilo(){
    this._router.navigate(['/registro']);
  }
  registroLibrero(){
    this._router.navigate(['/registro-libreria']);
  }
}
