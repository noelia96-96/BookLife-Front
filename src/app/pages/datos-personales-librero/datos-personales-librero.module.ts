import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatosPersonalesLibreroPageRoutingModule } from './datos-personales-librero-routing.module';
import { DatosPersonalesLibreroPage } from './datos-personales-librero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosPersonalesLibreroPageRoutingModule
  ],
  declarations: [DatosPersonalesLibreroPage]
})
export class DatosPersonalesLibreroPageModule {}
