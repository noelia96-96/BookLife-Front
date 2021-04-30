import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrarLibroPageRoutingModule } from './registrar-libro-routing.module';
import { RegistrarLibroPage } from './registrar-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarLibroPageRoutingModule
  ],
  declarations: [RegistrarLibroPage]
})
export class RegistrarLibroPageModule {}
