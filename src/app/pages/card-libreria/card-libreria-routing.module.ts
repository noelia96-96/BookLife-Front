import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardLibreriaPage } from './card-libreria.page';

const routes: Routes = [
  {
    path: '',
    component: CardLibreriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardLibreriaPageRoutingModule {}
