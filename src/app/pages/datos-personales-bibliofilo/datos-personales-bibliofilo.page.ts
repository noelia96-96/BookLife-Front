import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { usuarios } from 'src/app/interfaces/usuarios';
import { UsuarioService } from '../../services/usuario.service';
import { RootUsuarios } from '../../interfaces/usuarios';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './datos-personales-bibliofilo.page.html',
  styleUrls: ['./datos-personales-bibliofilo.page.scss'],
})
export class DatosPersonalesBibliofiloPage implements OnInit {
  @ViewChild('miCiudad') miCiudad: ElementRef;
  @ViewChild('miSexo') miSexo: ElementRef;

  _id: String;
  usuarioObtenido: usuarios;
  usuarioObtenidoRoot: RootUsuarios;
  myDefaultCiudad : String;
  myDefaultSexo : String;
  
  nuevoUsuario : usuarios = 
    {
    nombre : '',
    pwd: '',
    email: '',
    ciudad:'',
    sexo: ''
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
    this.myDefaultSexo = this.nuevoUsuario.sexo;
}

  ngAfterViewInit() {
    console.log(this.miCiudad);
    console.log(this.miSexo);
  }

  seleccionarCiudad(data){
    this.nuevoUsuario.ciudad = data.detail.value;
  }

  seleccionarSexo(data){
    this.nuevoUsuario.sexo = data.detail.value;
 
  }

  guardarDatosEditadosBibliofilo(){
    this._usuarioService.guardarDatosEditadosBibliofilo(); 
    this.router.navigate(['/perfil-bibliofilo']);
  }

  cancelar(){
    this.router.navigate(['/perfil-bibliofilo']);
  }

  }



