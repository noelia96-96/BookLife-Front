import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SeleccionRegistroPageRoutingModule } from './seleccion-registro-routing.module';
import { SeleccionRegistroPage } from './seleccion-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionRegistroPageRoutingModule
  ],
  declarations: [SeleccionRegistroPage]
})
export class SeleccionRegistroPageModule {}
