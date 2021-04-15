import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { ActivatedRoute} from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { RootEvento } from '../../interfaces/evento';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './modal-demo.page.html',
  styleUrls: ['./modal-demo.page.scss'],
})
export class ModalDemoPage implements OnInit {
  _id: String;
  eventoObtenido: Evento;
  eventoObtenidoRoot: RootEvento;

  nuevoEvento : Evento= 
    {
    nombreEvento : '',
    creador: '',
    fecha : new Date(),
    participantes: Array<String>()
  };

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private _eventoService:EventoService

    ) { }

  async ngOnInit() {
    //Buscar el evento
    this._id = this._eventoService.idEventoModificar;
    this.eventoObtenido = this.nuevoEvento;
    this.eventoObtenido = this._eventoService.buscarEvento();

  }

  guardar(){
     this._eventoService.guardarDatosEditados(); 
     this.router.navigate(['/principal-libreria']);
   }
   

cancelar(){
    //Poner 'refresh' para que al guardar, el nuevo bar aparezca en la pantalla de inicio 
    this.router.navigate(['/principal-libreria']);//da error con el 'refresh'
  
    }
  }



