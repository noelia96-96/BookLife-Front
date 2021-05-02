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
  public participantes: String[]; 

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
      if(evento.participantes.length === 4){
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

  //Desapuntarse de un evento
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


}
