import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    private _usuarioService:UsuarioService, 
    private _router:Router,
    private alertController: AlertController,
    ) { }
  
  //Datos de registro de usuario bibliofilo
  
  public nombre:string;
  public pwd:string;
  public email:string;
  public ciudad:string;
  public sexo:string;

  ngOnInit() {
  }

  //Objeto data que coge los datos que están en el formulario
  //Luego llama al método y cuando termina lo muestra por pantalla - respuesta post
  async registrar(){
    let data = {
      nombre: this.nombre,
      pwd: this.pwd,
      email: this.email,
      ciudad: this.ciudad,
      sexo:this.sexo,
      favoritos: Array<String>()
    }
     //Patrón email
     var pattern= new RegExp ('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})');
     if(pattern.test(this.email)){
       const resultado = await this._usuarioService.registro(data);
       this._router.navigate(['/inicio']);
     }else{
       const alert = await this.alertController.create({
         cssClass: 'my-custom-class',
         backdropDismiss: false,
         subHeader: 'Formato incorrecto del email',
         buttons: ['OK']
       });
       await alert.present();
     }
  }
  
  seleccionarCiudad(data){
    this.ciudad = data.detail.value;
  }

  seleccionarSexo(data){
    this.sexo = data.detail.value;
  }

   async presentAlert(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'BookLife',
      subHeader: 'App BookLife con la que podrás ver libreriás de segunda mano en la ciudad que estés. Podrás apuntarte a los eventos y reservar sus libros más interesantes.',
      buttons: ['OK']
    });

    await alert.present();
  }

  
}
