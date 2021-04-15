import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilLibreriaPage } from './perfil-libreria.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilLibreriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilLibreriaPageRoutingModule {}
