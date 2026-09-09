import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing-module';
import { Historial } from './historial';

@NgModule({
  declarations: [Historial],
  imports: [CommonModule, HistorialRoutingModule],
})
export class HistorialModule {}
