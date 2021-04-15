import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilBibliofiloPage } from './perfil-bibliofilo.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilBibliofiloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilBiblofiloPageRoutingModule {}
