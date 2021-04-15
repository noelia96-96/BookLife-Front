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
  
  //Datos de registro usuario
  public edad:number;
  public usuario:string;
  public pwd:string;
  public email:string;

  ngOnInit() {
  }

  //objeto data que coge los datos que estan en el formulario
  //Luego llama al metodo y cuando termina lo muestra por pantalla respuesta post
  async registro($){
    let data = {
      edad: this.edad,
      email: this.email,
      pwd: this.pwd,
      nombre:this.usuario
    }
   
    //Encriptar pwd
    //var bcrypt = require('bcryptjs');
    //var salt = bcrypt.genSaltSync(10);
    //var hash = bcrypt.hashSync(data.pwd, salt);
    //data.pwd = hash;
    
    const resultado = await this._usuarioService.registro(data);
    
    this._router.navigate(['/inicio']);


  }
  
}
