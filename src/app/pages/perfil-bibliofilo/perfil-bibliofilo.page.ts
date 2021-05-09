import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController} from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil-bibliofilo.page.html',
  styleUrls: ['./perfil-bibliofilo.page.scss'],
})
export class PerfilBibliofiloPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public usuario:String;
  public _id:string;

  constructor(
    private router: Router,
    private _usuarioService:UsuarioService,
    private alertController: AlertController
    ) { }


  async ngOnInit() {
    
    const logado  = await this._usuarioService.compruebaSiLogado();
    if(!logado){
      this.router.navigate(['/inicio']);
      return;
    }
    //llamar al servicio
    this.usuario = this._usuarioService.usuarioActual.nombre;
  }
  datosPersonales(){
    this.router.navigateByUrl('/datos-personales-bibliofilo');
  }
  cerrarSesion(){
    this._usuarioService.cerrarSesion();
    this.router.navigateByUrl('/inicio');
  }

  volver(){
    this.router.navigateByUrl('/perfil');
  }
  

}
