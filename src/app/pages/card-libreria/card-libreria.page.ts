import { Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router} from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { Libro } from 'src/app/interfaces/libro';
import { usuarios } from 'src/app/interfaces/usuarios';
import { UsuarioService } from '../../services/usuario.service';
import { EventoService } from '../../services/evento.service';
import { LibroService } from '../../services/libro.service';
import { AlertController} from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber} from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-card-libreria',
  templateUrl: './card-libreria.page.html',
  styleUrls: ['./card-libreria.page.scss'],
})
export class CardLibreriaPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private router: Router,
    private inAppBrowser: InAppBrowser,
    private _usuarioService:UsuarioService,
    private _eventoService:EventoService,
    private _libroService:LibroService,
    private alertController: AlertController,
    private socialSharing : SocialSharing,
    private callNumber: CallNumber,
   
    
    ) { }

  public usuario:String;
  public usuarioActual:any;
  public _id:String;

  //Para saber en que eventos estamos
  booleanEventos : boolean = true;

  //lista de eventos propios
  eventosPropios : Evento[]; 

  //lista de libros propios
  librosPropios : Libro[]; 

  //lista de usuarios
  usuariosLibreros : usuarios[]; 

  //limite de usuarios
  limiteUsuariosLibreros : number = 3; 

  //lista de favoritos
  favoritos : usuarios[]; 

  //limite de eventos propios
  limitePropio : number = 3; 

  //limite de libros propios
  limiteLibrosPropio : number = 3; 

  //limite de favoritos
  limiteFavoritos : number = 3; 

  //libreria pinchada
  libreriaPinchada : any = {};

  async ngOnInit() {
    
    const logado  = await this._usuarioService.compruebaSiLogado();
    this.usuarioActual = this._usuarioService.usuarioActual;
    this.libreriaPinchada = this._usuarioService.libreriaPinchadaCard;

    console.log(this.libreriaPinchada);
    if(!logado){
      this.router.navigate(['/inicio']);
      return;
    }

    //Para que se muestren las librerias al entrar en el perfil, que sea lo primero que se cargue
    this.verLibrosPicharCard();

    //llamar al servicio de usuario
    this.usuario = this._usuarioService.usuarioActual.nombre;
   
  }
  //Infinitte scroll
  async loadData(event){

      //Tenemos una lista de todos los eventos cargados
      //Tenemos una lista que va a ir cargando los eventos poco a poco - esta es la que se usa
      if(this.booleanEventos){

        //Limite de eventos propios
        this.limitePropio = this.limitePropio+3; 

        //Antes de llamar al servicio coger los eventos que tenemos ahora mismo
        const numeroVariableAntiguoEvento = this.eventosPropios.length;

        //Llamar al servicio para llamar al back para recuperar los eventos
        let nombreLibreriaPinchada = this.libreriaPinchada.nombre;
        await this._eventoService.mostrarEventosPicharCard(this.limitePropio, nombreLibreriaPinchada); 
        
        //Saber los eventos que tenemos nuevos
        const numeroVariableNuevoEvento = this._eventoService.eventoCardPinchada.length;

        //Carga del servicio la lista de los eventos
        if(numeroVariableAntiguoEvento == numeroVariableNuevoEvento){
          event.target.disabled = true;
        }else{
          this.eventosPropios = this._eventoService.eventoCardPinchada;
        }

      }else{

        //Limite de libros
        this.limiteLibrosPropio = this.limiteLibrosPropio+3; 

        //Antes de llamar al servicio coger los libros que tenemos ahora mismo
        const numeroVariableAntiguoLibro = this.librosPropios.length;

        //Llamar al servicio para llamar al back para recuperar los libros
        let nombreLibreriaPinchada = this.libreriaPinchada.nombre;
        await this._libroService.mostrarLibrosPicharCard(this.limiteLibrosPropio, nombreLibreriaPinchada);

        //Saber los libros que tenemos nuevos
        const numeroVariableNuevoLibro = this._libroService.libroCardPinchada.length;

        //Carga del servicio la lista de los libros
        if(numeroVariableAntiguoLibro == numeroVariableNuevoLibro){
          event.target.disabled = true;
        }else{
          this.librosPropios = this._libroService.libroCardPinchada;
        }

      }
      //completar la accion de cargar los eventos
      event.target.complete(); 
  }

  cerrarSesion(){
    this._usuarioService.cerrarSesion();
    this.router.navigateByUrl('/inicio');
  }

  async verLibrosPicharCard() {
    
    this.infiniteScroll.disabled = false;

    this.booleanEventos = false;

    //Quitar de la lista contraria los eventos
    this.eventosPropios = []; 

    //Quitar de la lista contraria las librerias
    this.usuariosLibreros = []; 

    //Limite de libros
    this.limiteLibrosPropio = 3; 

    //Llamar al servicio para llamar al back para recuperar los libros
    let nombreLibreriaPinchada = this.libreriaPinchada.nombre;
    await this._libroService.mostrarLibrosPicharCard(this.limiteLibrosPropio, nombreLibreriaPinchada);

    //Carga del servicio la lista de libros
    this.librosPropios = this._libroService.libroCardPinchada;
}

async verEventosPincharCard() {
    
    this.infiniteScroll.disabled = false;

    this.booleanEventos = true;

    //Quitar de la lista contraria las librerias
    this.usuariosLibreros = []; 

    //Quitar de la lista contraria los libros
    this.librosPropios = [];

    //Limite de eventos propios
    this.limitePropio = 3; 
    
    //Llamar al servicio para llamar al back para recuperar los eventos
    let nombreLibreriaPinchada = this.libreriaPinchada.nombre;
    await this._eventoService.mostrarEventosPicharCard(this.limitePropio, nombreLibreriaPinchada); 
    
    //Carga del servicio la lista de los eventos
    this.eventosPropios = this._eventoService.eventoCardPinchada;
}

//Boton del menu - favoritos
async fav() {

    //Quitar de la lista contraria los eventos
    this.eventosPropios = []; 

    //Quitar de la lista contraria los libros
    this.librosPropios = [];

    //Limpiar la propia lista en favoritos
    this.usuariosLibreros = [];

    //Limite favoritos
    this.limiteFavoritos = 3; 

    //Llamar al servicio para llamar al back para recuperar las librerias favoritas 
    await this._usuarioService.mostrarLibreriasFavoritas(this.limiteFavoritos);
    
    //Carga del servicio la lista de favoritos 
    this.usuariosLibreros = this._usuarioService.usuarioLibreria;
}

guardarFavorito(libreria){
  this._usuarioService.usuarioActual.favoritos.push(libreria);
  this._usuarioService.guadarLibreriaFav(libreria);
}

borrarFavorito(libreria){
  // obtenemos el indice
  var indice = this._usuarioService.usuarioActual.favoritos.indexOf(libreria);

  // 1 es la cantidad de elemento a eliminar
  this._usuarioService.usuarioActual.favoritos.splice(indice,1);

  //borrar la libreria
  this._usuarioService.borrarLibreriaFav(libreria);
}

//Apuntarse al evento
async apuntarse(evento:Evento){
  //Contemplar mensaje de apuntarse o mensaje de evento completo
    const index = evento.participantes.findIndex(usuario => usuario === this.usuario);

    if(index > -1){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        backdropDismiss: false,
        subHeader: 'Ya estás apuntado en este evento',
        buttons: ['OK']
      });
      await alert.present();
    }else{
      if(evento.participantes.length === 10){
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          backdropDismiss: false,
          subHeader: 'Evento completado',
          buttons: ['OK']
        });
        await alert.present();
      }else{
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          subHeader: '¡Te has apuntado al evento!',
          buttons: ['OK']
        });
        await alert.present();

        evento.participantes.push(this.usuario);
    
        const datos = {
          _id: evento._id,
        }
         this._eventoService.apuntarse(datos); 
       }
     } 
}

//Desapuntarse del evento
async desapuntarse(evento:Evento){
   var indice = evento.participantes.indexOf(this.usuario); // obtenemos el indice
    evento.participantes.splice(indice,1); // 1 es la cantidad de elemento a eliminar
    
    const datos = {
      _id: evento._id,
    }
    await this._eventoService.desapuntarse(datos);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'Te has borrado del evento',
      buttons: ['OK']
    });
    await alert.present();
}

compartirLibreria(usuario){                  
   var options = {
    message: 'Mira esta librería', // not supported on some apps (Facebook, Instagram)
    web: usuario.web
 };
    this.socialSharing.shareWithOptions(options);
  }

async reservarLibro(libro:Libro){
    const index = libro.participantes.findIndex(usuario => usuario === this.usuario);

    const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        subHeader: '¡Has reservado el libro con éxito!',
        buttons: ['OK']
      });
      await alert.present();

      libro.participantes.push(this.usuario);
    
      const datos = {
        nombreLibro: libro.nombreLibro,
      }
      this._libroService.reservarLibro(datos); 
}

async quitarReservaLibro(libro:Libro){
  var indice = libro.participantes.indexOf(this.usuario); // obtenemos el indice
    libro.participantes.splice(indice,1); // 1 es la cantidad de elemento a eliminar
    
    const datos = {
      nombreLibro: libro.nombreLibro,
    }
    await this._libroService.quitarReservaLibro(datos);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'Has cancelado la reserva del libro con éxito',
      buttons: ['OK']
    });
    await alert.present();
  }

  volver(){
    this.router.navigateByUrl('/perfil');
  }

  telefono(){
    const telefono = this.libreriaPinchada.telefono;
    this.callNumber.callNumber(telefono, true)
    .then(res => console.log('Abriendo marcador', res))
    .catch(err => console.log('Error marcador', err));
  }

  web(){
    let web = this.libreriaPinchada.web;
    this.inAppBrowser.create(web, '_blank',{ 
      lefttoright: 'yes',
      toolbarposition: 'top',
      presentationstyle:'fullscreen',
      toolbartranslucent:	'yes',
      location: 'yes',
      hidden: 'no',
      hideweblibreria:	'yes'
    });

  }
}
