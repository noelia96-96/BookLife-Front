import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalLibreriaPage } from './principal-libreria.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalLibreriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalLibreriaPageRoutingModule {}
