import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroLibreriaPageRoutingModule } from './registro-libreria-routing.module';
import { RegistroLibreriaPage } from './registro-libreria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroLibreriaPageRoutingModule
  ],
  declarations: [RegistroLibreriaPage]
})
export class RegistroLibreriaPageModule {}
