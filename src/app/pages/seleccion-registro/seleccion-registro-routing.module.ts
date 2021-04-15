import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeleccionRegistroPage } from './seleccion-registro.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionRegistroPageRoutingModule {}
