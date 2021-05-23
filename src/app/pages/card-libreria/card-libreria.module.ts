import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardLibreriaPageRoutingModule } from './card-libreria-routing.module';
import { CardLibreriaPage } from './card-libreria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardLibreriaPageRoutingModule
  ],
  declarations: [CardLibreriaPage]
})
export class CardLibreriaPageModule {}
