import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro-libreria.page.html',
  styleUrls: ['./registro-libreria.page.scss'],
})
export class RegistroLibreriaPage implements OnInit {

  constructor(private _usuarioService:UsuarioService, private _router:Router) { }
  
  //Datos de registro de usuario librero
  public nombre:string;
  public ciudad:string;
  public direccion:string;
  public telefono:number;
  public web:string;
  public email:string;
  public pwd:string;

  ngOnInit() {
  }

  //objeto data que coge los datos que estan en el formulario
  //Luego llama al metodo y cuando termina lo muestra por pantalla respuesta post
  async registroLibreria($){
    let data = {
      nombre:this.nombre,
      ciudad:this.ciudad,
      direccion:this.direccion,
      telefono:this.telefono,
      web:this.web,
      email:this.email,
      pwd:this.pwd, 
    }
    console.log(data)
   
    const resultado = await this._usuarioService.registroLibreria(data);
    this._router.navigate(['/inicio']);
  }

  seleccionarCiudad(data){
    this.ciudad = data.detail.value;
  }

}
