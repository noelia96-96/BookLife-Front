import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private _usuarioService:UsuarioService, private _router:Router) { }
  
  //Datos de registro de usuario bibliofilo
  
  public usuario:string;
  public pwd:string;
  public email:string;
  public ciudad:string;
  public sexo:string;

  ngOnInit() {
  }

  //Objeto data que coge los datos que están en el formulario
  //Luego llama al método y cuando termina lo muestra por pantalla - respuesta post
  async registrar($){
    let data = {
     
      usuario: this.usuario,
      pwd: this.pwd,
      email: this.email,
      ciudad: this.ciudad,
      sexo:this.sexo
    }
    
    const resultado = await this._usuarioService.registro(data);
    
    this._router.navigate(['/inicio']);


  }
  
}
