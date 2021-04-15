import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilLibreriaPageRoutingModule } from './perfil-libreria-routing.module';
import { PerfilLibreriaPage } from './perfil-libreria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilLibreriaPageRoutingModule
  ],
  declarations: [PerfilLibreriaPage]
})
export class PerfilLibreriaPageModule {}
