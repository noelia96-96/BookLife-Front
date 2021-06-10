import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-registro-libreria',
  templateUrl: './registro-libreria.page.html',
  styleUrls: ['./registro-libreria.page.scss'],
})
export class RegistroLibreriaPage implements OnInit {

  constructor(
    private _usuarioService:UsuarioService, 
    private _router:Router, 
    private alertController: AlertController,
    ) { }
  
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
  async registroLibreria(){
    let data = {
      nombre:this.nombre,
      ciudad:this.ciudad,
      direccion:this.direccion,
      telefono:this.telefono,
      web:this.web,
      email:this.email,
      pwd:this.pwd, 
    }
    
    //Patrón email
    var patternEmail= new RegExp ('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})');
    //Patrón teléfono
    var patternTelefono= new RegExp ('[0-9]{9}');

    if(!patternEmail.test(this.email)){
       const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        backdropDismiss: false,
        subHeader: 'Formato incorrecto del email',
        buttons: ['OK']
      });
      await alert.present();
    }else if(!patternTelefono.test(this.telefono.toString())){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        backdropDismiss: false,
        subHeader: 'Formato incorrecto del teléfono',
        buttons: ['OK']
      });
      await alert.present();

    }else if(!this.web.includes('https://www.')){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        backdropDismiss: false,
        subHeader: 'Formato incorrecto de la web: añade https://www.',
        buttons: ['OK']
      });
      await alert.present();
    }
    else{
      const resultado = await this._usuarioService.registroLibreria(data);
      this._router.navigate(['/inicio']);
     
    }
  }

  seleccionarCiudad(data){
    this.ciudad = data.detail.value;
  }

  async presentAlert(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'BookLife',
      subHeader: 'App BookLife con la que podrás crear eventos y publicar libros para los amantes de los libros puedan conocerte.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
