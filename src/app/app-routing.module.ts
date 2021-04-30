import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'perfil/:usuario',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'modal-demo',
    loadChildren: () => import('./pages/modal-demo/modal-demo.module').then( m => m.ModalDemoPageModule)
  },
  {
    path: 'modal-demo/:_id',
    loadChildren: () => import('./pages/modal-demo/modal-demo.module').then( m => m.ModalDemoPageModule)
  },
  {
    path: 'registrar-evento',
    loadChildren: () => import('./pages/registrar-evento/registrar-evento.module').then( m => m.RegistrarEventoPageModule)
  },
  {
    path: 'seleccion-registro',
    loadChildren: () => import('./pages/seleccion-registro/seleccion-registro.module').then( m => m.SeleccionRegistroPageModule)
  },
  {
    path: 'registro-libreria',
    loadChildren: () => import('./pages/registro-libreria/registro-libreria.module').then( m => m.RegistroLibreriaPageModule)
  },
  {
    path: 'perfil-bibliofilo',
    loadChildren: () => import('./pages/perfil-bibliofilo/perfil-bibliofilo.module').then( m => m.PerfilBibliofiloPageModule)
  },
  {
    path: 'perfil-libreria',
    loadChildren: () => import('./pages/perfil-libreria/perfil-libreria.module').then( m => m.PerfilLibreriaPageModule)
  },
  {
    path: 'principal-libreria',
    loadChildren: () => import('./pages/principal-libreria/principal-libreria.module').then( m => m.PrincipalLibreriaPageModule)
  },
  {
    path: 'registrar-libro',
    loadChildren: () => import('./pages/registrar-libro/registrar-libro.module').then( m => m.RegistrarLibroPageModule)
  },
  {
    path: 'modal-demo-libro',
    loadChildren: () => import('./pages/modal-demo-libro/modal-demo-libro.module').then( m => m.ModalDemoLibroPageModule)
  },
  {
    path: 'modal-demo-libro/:_id',
    loadChildren: () => import('./pages/modal-demo-libro/modal-demo-libro.module').then( m => m.ModalDemoLibroPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
