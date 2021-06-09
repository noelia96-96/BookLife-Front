import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute} from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-registrar-evento',
  templateUrl: './registrar-evento.page.html',
  styleUrls: ['./registrar-evento.page.scss'],
})
export class RegistrarEventoPage implements OnInit {

  constructor(
    private _router: Router,
    private _eventoService:EventoService,
    private _usuarioService:UsuarioService,
    private camera : Camera
    ) { }
  public usuario: string;
  //Datos registro evento
  public creador: string;
  public nombreEvento: string;
  public direccion: string;
  public ciudad: string;
  public fecha: Date;
  public hora: Date;
  public participantes: string[] = [];
  mostrarImagen : string;

  async ngOnInit() {
    await this._usuarioService.compruebaSiLogado();
    this.usuario = this._usuarioService.usuarioActual.nombre;
    this.ciudad = this._usuarioService.usuarioActual.ciudad;
  }

  async guardar(){
    const data = {
     
      nombreEvento: this.nombreEvento,
      direccion : this.direccion,
      ciudad : this.ciudad,
      //creador: this.usuario, El creador NO se le pasa en la costante desde el front,en el back se coge del token.
      fecha: this.fecha,
      hora: this.hora,
      participantes: this.participantes,
      base64 : this.mostrarImagen
    }
    await this._eventoService.registrarEvento(data);

    this._router.navigate(['/principal-libreria']);
  }

  cancelar(){
    //Poner 'refresh' para que al guardar, el nuevo evento aparezca en la pagina principal del librero
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
