import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalDemoLibroPageRoutingModule } from './modal-demo-libro-routing.module';
import { ModalDemoLibroPage } from './modal-demo-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDemoLibroPageRoutingModule
  ],
  declarations: [ModalDemoLibroPage]
})
export class ModalDemoLibroPageModule {}
