import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrincipalLibreriaPageRoutingModule } from './principal-libreria-routing.module';
import { PrincipalLibreriaPage } from './principal-libreria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalLibreriaPageRoutingModule
  ],
  declarations: [PrincipalLibreriaPage]
})
export class PrincipalLibreriaPageModule {}
