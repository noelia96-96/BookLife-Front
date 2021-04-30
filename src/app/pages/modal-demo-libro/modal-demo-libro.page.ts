import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Libro } from 'src/app/interfaces/libro';
import { ActivatedRoute} from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { RootLibro } from '../../interfaces/libro';

@Component({
  selector: 'app-modal-demo-libro',
  templateUrl: './modal-demo-libro.page.html',
  styleUrls: ['./modal-demo-libro.page.scss'],
})
export class ModalDemoLibroPage implements OnInit {
  _id: String;
  libroObtenido: Libro;
  libroObtenidoRoot: RootLibro;

  nuevoLibro : Libro = 
    {
    nombreLibro : '',
    genero: '',
    autor : '',
    precio: '',
    participantes: Array<String>()
  };

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private _libroService: LibroService

    ) { }

  async ngOnInit() {
    //Buscar el libro
    this._id = this._libroService.idLibroModificar;
    this.libroObtenido = this.nuevoLibro;
    this.libroObtenido = this._libroService.buscarLibro();

  }

  guardar(){
     this._libroService.guardarDatosEditados(); 
     this.router.navigate(['/principal-libreria']);
   }
   

cancelar(){
    //Poner 'refresh' para que al guardar, el nuevo libro aparezca en la pantalla de inicio 
    this.router.navigate(['/principal-libreria']);//da error con el 'refresh'
  
    }
  }



