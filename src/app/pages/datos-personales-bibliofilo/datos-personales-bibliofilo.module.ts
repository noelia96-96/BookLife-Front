import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatosPersonalesBibliofiloPageRoutingModule } from './datos-personales-bibliofilo-routing.module';
import { DatosPersonalesBibliofiloPage } from './datos-personales-bibliofilo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosPersonalesBibliofiloPageRoutingModule
  ],
  declarations: [DatosPersonalesBibliofiloPage]
})
export class DatosPersonalesBibliofiloPageModule {}
