import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { UsuarioService } from '../../services/usuario.service';
import { EventoService } from '../../services/evento.service';
import { AlertController} from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private router: Router,
    private _usuarioService:UsuarioService,
    private _eventoService:EventoService, 
    private alertController: AlertController,
    
    ) { }


  async ngOnInit() {
    const logado  = await this._usuarioService.compruebaSiLogado();
    if(!logado){
      this.router.navigate(['/inicio']);
      return;
    }
  }
  //Infinitte scroll
  //hacer metodo 


  cerrarSesion(){
    this._usuarioService.cerrarSesion();
    this.router.navigateByUrl('/inicio');
  }
  geolocalizacion(latitud:string, longitud:string):void{
    /*this.inAppBrowser.create(`https://maps.google.com/maps?z=25&t=m&q=loc:${latitud},${longitud}`,'_blank',{ 
      lefttoright: 'yes',
      toolbarposition: 'top',
      presentationstyle:'fullscreen',
      toolbartranslucent:	'yes',
      location: 'yes',
      hidden: 'no'
    });*/

  }

  llamarTelefono(telefono:string){

    /*this.callNumber.callNumber(telefono, true)
      .then(res => console.log('Abriendo marcador', res))
      .catch(err => console.log('Error marcador', err));

  }*/
  
}

compartir(){

}

librerias() {

}
libreros() {

}

eventos() {

}
favoritos() {
  
}


}
