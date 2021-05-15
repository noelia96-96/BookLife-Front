import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { Libro } from 'src/app/interfaces/libro';
import { UsuarioService } from '../../services/usuario.service';
import { EventoService } from '../../services/evento.service';
import { LibroService } from '../../services/libro.service';
import { AlertController} from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './principal-libreria.page.html',
  styleUrls: ['./principal-libreria.page.scss'],
})
export class PrincipalLibreriaPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public usuario:String;
  public _id:String;

  //Para saber en que eventos estamos
  booleanEventos : boolean = true;

  //lista de eventos propios
  eventosPropios : Evento[]; 

  //lista de libros propios
  librosPropios : Libro[]; 

  //limite de eventos propios
  limitePropio : number = 3; 

  //limite de libros propios
  limiteLibrosPropio : number = 3; 


  constructor(
    private router: Router,
    private _usuarioService:UsuarioService,
    private _eventoService:EventoService, 
    private _libroService:LibroService, 
    private alertController: AlertController
    ) { }

  async ngOnInit() {
    
    const logado  = await this._usuarioService.compruebaSiLogado();
    if(!logado){
      this.router.navigate(['/inicio']);
      return;
    }
    //llamar al servicio
    await this._eventoService.getEventos(this.limitePropio);
    this.usuario = this._usuarioService.usuarioActual.nombre;
    this.eventosPropios = this._eventoService.eventosPropios;
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

      }

      //completar la accion de cargar los eventos
      event.target.complete(); 

  }

  async loadEventosPropios(){
    this.booleanEventos = true;
    
    //Quitar de la lista contraria los libros 
    this.librosPropios = []; 
    
    //limite de eventos propios
    this.limitePropio = 3;
    
    //llamar al servicio para llamar al back para recuperar los eventos
    await this._eventoService.getEventos(this.limitePropio);
    
    //Carga del servicio la lista de los eventos
    this.eventosPropios = this._eventoService.eventosPropios;
  }

  async loadLibrosPropios(){
    this.booleanEventos = false;
    //Quitar de la lista contraria los eventos 
    this.eventosPropios = []; 

    //limite de libros propios
    this.limiteLibrosPropio = 3;

    //llamar al servicio para llamar al back para recuperar los libros
    await this._libroService.getLibros(this.limiteLibrosPropio);
    
    //Carga del servicio la lista de los libros
    this.librosPropios = this._libroService.librosPropios;
  }

  cerrarSesion(){
    this._usuarioService.cerrarSesion();
    this.router.navigateByUrl('/inicio');
  }
  crearEvento(){
    this.router.navigate(['/registrar-evento']);
  }
  
  editarEvento(_id:String){
    console.log(_id);
    this._eventoService.idEventoModificar = _id;
    this.router.navigate(['/modal-demo']);
  }

  //borrar evento
  async borrarEvento(evento : any){
    this._eventoService.eventoIdBorrar = evento;
    await this. _eventoService.borrar();

    let eventoPropio: Evento;
    for(let data of this.eventosPropios){
      if(data._id == evento){
        eventoPropio = data;
      }
    }
    let indexP = this.eventosPropios.indexOf(eventoPropio);
    this.eventosPropios.splice(indexP,1);
  }

  publicarLibro(){
    this.router.navigate(['/registrar-libro']);
  }
  editarLibro(_id:String){
    this._libroService.idLibroModificar = _id;
    this.router.navigate(['/modal-demo-libro']);
      
  }
  async borrarLibro(libro:any){
    this._libroService.libroIdBorrar = libro;
    await this. _libroService.borrar();

    let libroPropio: Libro;
    for(let data of this.librosPropios){
      if(data._id == libro){
        libroPropio = data;
      }
    }
    let indexP = this.librosPropios.indexOf(libroPropio);
    this.librosPropios.splice(indexP,1);
  }

}
