import { Component, OnInit, ViewChild } from '@angular/core';
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
    private _libroService:LibroService,
    private alertController: AlertController,
    private socialSharing : SocialSharing,
    
    ) { }

  public usuario:String;
  public usuarioActual:any;
  public _id:String;

  //Para saber en que eventos estamos
  booleanEventos : boolean = false;

  //Para saber en que Libros estamos
  booleanLibros : boolean = false;

  //Para saber en que Librerias estamos
  booleanLibrerias : boolean = false;

  //Para saber en que Favoritos estamos
  booleanFavoritos : boolean = false;

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

  async ngOnInit() {
    
    const logado  = await this._usuarioService.compruebaSiLogado();
    this.usuarioActual = this._usuarioService.usuarioActual;
    if(!logado){
      this.router.navigate(['/inicio']);
      return;
    }

    //Para que se muestren las librerias al entrar en el perfil, que sea lo primero que se cargue
    this.librerias();

    //llamar al servicio de usuario
    this.usuario = this._usuarioService.usuarioActual.nombre;
   
  }
  //Infinitte scroll
  async loadData(event){

      //Tenemos una lista de todos los eventos cargados
      //Tenemos una lista que va a ir cargando los eventos poco a poco - esta es la que se usa
      if(this.booleanEventos){

        //Limite de eventos propios
        this.limitePropio = this.limitePropio + 3;

        //Antes de llamar al servicio coger los eventos que tenemos ahora mismo
        const numeroVariableAntiguoEvento = this.eventosPropios.length;

        //Cargar en la lista propia mis eventos
        await this._eventoService.getEventos(this.limitePropio);

        //Saber los eventos que tenemos nuevos
        const numeroVariableNuevoEvento = this._eventoService.eventosPropios.length;

        //Carga del servicio la lista de los eventos
        if(numeroVariableAntiguoEvento == numeroVariableNuevoEvento){
          event.target.disabled = true;
        }else{
          this.eventosPropios = this._eventoService.eventosPropios;
        }        

      }else if(this.booleanLibrerias){

        //Limite de usuarios tipo - libreria
        this.limiteUsuariosLibreros = this.limiteUsuariosLibreros + 3;

        //Antes de llamar al servicio coger las librerias que tenemos ahora mismo
        const numeroVariableAntiguaLibreria = this.usuariosLibreros.length;

        //Llamar al servicio para llamar al back para recuperar los libros
        await this._usuarioService.mostrarLibreria(this.limiteUsuariosLibreros);

        //Saber las librerias que tenemos nuevas
        const numeroVariableNuevaLibreria = this._usuarioService.usuarioLibreria.length;

        //Carga del servicio la lista de las librerias
        if(numeroVariableAntiguaLibreria == numeroVariableNuevaLibreria){
          event.target.disabled = true;
        }else{
          this.usuariosLibreros = this._usuarioService.usuarioLibreria;
        }   

      }else if(this.booleanLibros){

        //Limite de libros
        this.limiteLibrosPropio = this.limiteLibrosPropio+3; 

        //Antes de llamar al servicio coger los libros que tenemos ahora mismo
        const numeroVariableAntiguoLibro = this.librosPropios.length;

        //Llamar al servicio para llamar al back para recuperar los libros
        await this._libroService.mostrarLibros(this.limiteLibrosPropio);
        
        //Saber los libros que tenemos nuevos
        const numeroVariableNuevoLibro = this._libroService.librosPropios.length;

        //Carga del servicio la lista de los libros
        if(numeroVariableAntiguoLibro == numeroVariableNuevoLibro){
          event.target.disabled = true;
        }else{
          this.librosPropios = this._libroService.librosPropios;
        }

      }else if(this.booleanFavoritos){

        //Limite favoritos
        this.limiteFavoritos = this.limiteFavoritos +3; 

        //Antes de llamar al servicio coger los favoritos que tenemos ahora mismo
        const numeroVariableAntiguoFavorito = this.usuariosLibreros.length;

        //Llamar al servicio para llamar al back para recuperar las librerias favoritas 
        await this._usuarioService.mostrarLibreriasFavoritas(this.limiteFavoritos);
        
        //Saber los favoritos que tenemos nuevos
        const numeroVariableNuevoFavorito = this._usuarioService.usuarioLibreria.length;

        //Carga del servicio la lista de los favoritos
        if(numeroVariableAntiguoFavorito == numeroVariableNuevoFavorito){
          event.target.disabled = true;
        }else{
          this.usuariosLibreros = this._usuarioService.usuarioLibreria;
        }

      }
      //completar la accion de cargar los eventos
      event.target.complete(); 
  }

  cerrarSesion(){
    this._usuarioService.cerrarSesion();
    this.router.navigateByUrl('/inicio');
  }

async librerias() {

   this.infiniteScroll.disabled = false;

    //Poner a true el boolean de librerias para saber que estamos viendo librerias
    this.booleanLibrerias=true;
    this.booleanFavoritos=false;
    this.booleanEventos=false;
    this.booleanLibros=false;

    //Quitar de la lista contraria los eventos
    this.eventosPropios = []; 

    //Quitar de la lista contraria los libros
    this.librosPropios = [];

    //Limpiar la propia lista de librerias
    this.usuariosLibreros = [];

    //limite de usuarios tipo - libreria
    this.limiteUsuariosLibreros = 3;

    //llamar al servicio para llamar al back para recuperar los libros
    await this._usuarioService.mostrarLibreria(this.limiteUsuariosLibreros);
    
    //Carga del servicio la lista de usuarios
    this.usuariosLibreros = this._usuarioService.usuarioLibreria;
}

async eventos() {

    this.infiniteScroll.disabled = false;

    //Poner a true el boolean de Eventos para saber que estamos viendo Eventos
    this.booleanLibrerias=false;
    this.booleanFavoritos=false;
    this.booleanEventos=true;
    this.booleanLibros=false;
    //Quitar de la lista contraria las librerias
    this.usuariosLibreros = []; 

    //Quitar de la lista contraria los libros
    this.librosPropios = [];

    //Limite de eventos propios
    this.limitePropio = 3; 
    
    //Llamar al servicio para llamar al back para recuperar los eventos
    await this._eventoService.getEventosPorBibliofilo(this.limitePropio);
    
    //Carga del servicio la lista de los eventos
    this.eventosPropios = this._eventoService.eventosPropios;
}

async libros() {
    
    this.infiniteScroll.disabled = false;

    //Poner a true el boolean de Libros para saber que estamos viendo Libros
    this.booleanLibrerias=false;
    this.booleanFavoritos=false;
    this.booleanEventos=false;
    this.booleanLibros=true;

    //Quitar de la lista contraria los eventos
    this.eventosPropios = []; 

    //Quitar de la lista contraria las librerias
    this.usuariosLibreros = []; 

    //Limite de libros
    this.limiteLibrosPropio = 3; 

    //Llamar al servicio para llamar al back para recuperar los libros
    await this._libroService.mostrarLibros(this.limiteLibrosPropio);
    
    //Carga del servicio la lista de libros
    this.librosPropios = this._libroService.librosPropios;

}

//Boton del menu - favoritos
async fav() {

    this.infiniteScroll.disabled = false;

    //Poner a true el boolean de Favoritos para saber que estamos viendo Favoritos
    this.booleanLibrerias=false;
    this.booleanFavoritos=true;
    this.booleanEventos=false;
    this.booleanLibros=false;

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
  
verLibreria(usuario){
  this._usuarioService.libreriaPinchadaCard = usuario;  
  this.router.navigate(['/card-libreria']);
}


}


