import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroLibreriaPage } from './registro-libreria.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroLibreriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroLibreriaPageRoutingModule {}
