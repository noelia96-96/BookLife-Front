import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosPersonalesLibreroPage } from './datos-personales-librero.page';

const routes: Routes = [
  {
    path: '',
    component: DatosPersonalesLibreroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosPersonalesLibreroPageRoutingModule {}
