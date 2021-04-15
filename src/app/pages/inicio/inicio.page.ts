import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
  async presentAlert(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'App MyEvent realizada para la asignatura HLC, IES.Sotero Hernández. Curso 2020-2021',
      message: 'Autor: Noelia Galindo García',
      buttons: ['OK']
    });

    await alert.present();
  }

}
