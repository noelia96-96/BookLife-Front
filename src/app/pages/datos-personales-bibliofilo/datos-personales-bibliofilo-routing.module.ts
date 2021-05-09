import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosPersonalesBibliofiloPage } from './datos-personales-bibliofilo.page';

const routes: Routes = [
  {
    path: '',
    component: DatosPersonalesBibliofiloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosPersonalesBibliofiloPageRoutingModule {}
