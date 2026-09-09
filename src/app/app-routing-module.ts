import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'reproductor', pathMatch: 'full' },
  {
    path: 'reproductor',
    loadChildren: () => import('./reproductor/reproductor-module').then(m => m.ReproductorModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial-module').then(m => m.HistorialModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}