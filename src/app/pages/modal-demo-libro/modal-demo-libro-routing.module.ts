import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalDemoLibroPage } from './modal-demo-libro.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDemoLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDemoLibroPageRoutingModule {}
