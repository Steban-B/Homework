import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Historial } from './historial';

const routes: Routes = [{ path: '', component: Historial }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialRoutingModule {}
