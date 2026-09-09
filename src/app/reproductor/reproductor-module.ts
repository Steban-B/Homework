import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReproductorRoutingModule } from './reproductor-routing-module';
import { Reproductor } from './reproductor';

@NgModule({
  declarations: [Reproductor],
  imports: [CommonModule, ReproductorRoutingModule],
})
export class ReproductorModule {}
