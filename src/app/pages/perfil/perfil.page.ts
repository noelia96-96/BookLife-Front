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


  async ngOnInit() {
    
    const logado  = await this._usuarioService.compruebaSiLogado();
    this.usuarioActual = this._usuarioService.usuarioActual;
    console.log(this.usuarioActual);
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

        //limite de eventos propios
        this.limitePropio = this.limitePropio + 3;
        //Cargar en la lista propia mis eventos
        await this._eventoService.getEventos(this.limitePropio);
        this.eventosPropios = this._eventoService.eventosPropios;

      }else{

        //limite de libros propios
        this.limiteLibrosPropio = this.limiteLibrosPropio + 3;
        
        //Cargar en la lista de libros propios
        await this._libroService.getLibros(this.limiteLibrosPropio);
        this.librosPropios = this._libroService.librosPropios;

        //Cargar los usuarios
        await this._usuarioService.mostrarLibreria(this.limiteUsuariosLibreros);
        this.usuariosLibreros = this._usuarioService.usuarioLibreria;

      }
      //completar la accion de cargar los eventos
      event.target.complete(); 
  }

  cerrarSesion(){
    this._usuarioService.cerrarSesion();
    this.router.navigateByUrl('/inicio');
  }

async librerias() {

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
    this.booleanEventos = true;

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

//verLibros(){
  
//}

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
    await this._usuarioService.mostrarLibrosFavoritos(this.limiteFavoritos);
    
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



}
