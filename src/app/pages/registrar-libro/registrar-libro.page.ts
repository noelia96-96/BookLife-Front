import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { ActivatedRoute} from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Libro } from '../../interfaces/libro';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-registrar-libro',
  templateUrl: './registrar-libro.page.html',
  styleUrls: ['./registrar-libro.page.scss'],
})
export class RegistrarLibroPage implements OnInit {

  constructor(
    private _router: Router,
    private _libroService:LibroService,
    private _usuarioService:UsuarioService,
    private camera : Camera
    ) { }

  public usuario: string;
  //Datos registro libro
  //public creador: string;
  public nombreLibro: string;
  public genero: string;
  public autor: string;
  public precio: number;
  public participantes: string[] = [];
  mostrarImagen : string;

  async ngOnInit() {
    await this._usuarioService.compruebaSiLogado();
    this.usuario = this._usuarioService.usuarioActual.nombre;
  }

  async guardar(){
    const data = {
      //creador: this.usuario, El creador NO se le pasa en la costante desde el front,en el back se coge del token.
      nombreLibro: this.nombreLibro,
      genero: this.genero,
      autor: this.autor,
      precio: this.precio,
      participantes: this.participantes,
      base64 : this.mostrarImagen
    }
    await this._libroService.registrarLibro(data);

    this._router.navigate(['/principal-libreria']);
  }

  cancelar(){
    //Poner 'refresh' para que al guardar, el nuevo libro aparezca en la pagina principal del librero
    this._router.navigate(['/principal-libreria']);//linea incompleta, da error con el 'refresh'
  
  }

  abrirGaleria(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(resultado =>{
      this.mostrarImagen = 'data:image/jpeg;base64,' + resultado;

    }).catch(err =>{
      console.log('Err', err);
    })

  }

  abrirCamara(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(resultado =>{
      this.mostrarImagen = 'data:image/jpeg;base64,' + resultado;

    }).catch(err =>{
      console.log('Err', err);
    })
  }
}
