import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { usuarios } from 'src/app/interfaces/usuarios';
import { UsuarioService } from '../../services/usuario.service';
import { RootUsuarios } from '../../interfaces/usuarios';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-modal-demo',
  templateUrl: './datos-personales-librero.page.html',
  styleUrls: ['./datos-personales-librero.page.scss'],
})
export class DatosPersonalesLibreroPage implements OnInit {
  @ViewChild('miCiudad') miCiudad: ElementRef;

  _id: String;
  usuarioObtenido: usuarios;
  usuarioObtenidoRoot: RootUsuarios;
  myDefaultCiudad : String;

  nuevoUsuario : usuarios = 
    {
    nombre : '',
    pwd: '',
    email: '',
    web : '',
    telefono: new Number(),
    ciudad:'',
    direccion: ''
  };

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private _usuarioService: UsuarioService

    ) { }

  async ngOnInit() {
    //Buscar el usuario
    await this._usuarioService.mostrarUsuario();
    this.nuevoUsuario = this._usuarioService.usuario[0][0];
    this.myDefaultCiudad = this.nuevoUsuario.ciudad;
    console.log(this.nuevoUsuario)
    console.log(this.myDefaultCiudad)
}

  ngAfterViewInit() {
    console.log(this.miCiudad);
  }

  seleccionarCiudad(data){
    this.nuevoUsuario.ciudad = data.detail.value;
  }

  guardarDatosEditadosLibreria(){
    this._usuarioService.guardarDatosEditadosLibreria(); 
    this.router.navigate(['/perfil-libreria']);
  }

  cancelar(){
    this.router.navigate(['/perfil-libreria']);
}

}

