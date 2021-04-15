import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilBiblofiloPageRoutingModule } from './perfil-bibliofilo-routing.module';
import { PerfilBibliofiloPage } from './perfil-bibliofilo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilBiblofiloPageRoutingModule
  ],
  declarations: [PerfilBibliofiloPage]
})
export class PerfilBibliofiloPageModule {}
