import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Reproductor } from './reproductor';

const routes: Routes = [{ path: '', component: Reproductor }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReproductorRoutingModule {}
