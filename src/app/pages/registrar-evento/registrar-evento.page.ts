import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute} from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

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
    ) { }
  public usuario:String;
  //Datos registro evento
  public nombreEvento: string;
  public creador: string;
  public fecha: Date;
  public participantes: string[] = [];

  async ngOnInit() {
    await this._usuarioService.compruebaSiLogado();
    this.usuario = this._usuarioService.usuarioActual.nombre;
  }

  async guardar(){
    const data = {
      nombreEvento: this.nombreEvento,
      //creador: this.usuario, El creador NO se le pasa en la costante desde el front,en el back se coge del token.
      fecha: this.fecha,
      participantes: this.participantes
    }
    await this._eventoService.registrarEvento(data);

    this._router.navigate(['/principal-libreria']);
  }

  cancelar(){
    //Poner 'refresh' para que al guardar, el nuevo evento aparezca en el perfil
    this._router.navigate(['/principal-libreria']);//da error con el 'refresh'
  
  }


 



}
