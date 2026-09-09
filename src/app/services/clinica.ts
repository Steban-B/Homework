import { Injectable } from '@angular/core';
import { ListaPacientes } from '../models/lista-pacientes';
import { ListaHistorial } from '../models/lista-historial';
import { ListaMedicosCircular } from '../models/lista-medicos';
import { ListaComiteCircularDoble } from '../models/lista-comite';

@Injectable({ providedIn: 'root' })

export class ClinicaService {
  listaPacientes = new ListaPacientes();
  listaHistorial = new ListaHistorial();
  listaMedicos = new ListaMedicosCircular();
  listaComite = new ListaComiteCircularDoble();

  private intervalo: any;

  constructor() {
    ['lindsay clancy', 'Dexter', 'Jhonathan'].forEach(p => this.listaPacientes.agregar(p));
    ['Dr. Banano', 'Dra. Ararat', 'Dr. House'].forEach(m => this.listaMedicos.agregar(m));
    ['Director Peruka', 'Subdirector Vladimir Putin', 'Tesorero Netanyaju', 'Vocal Shiyin ping']
      .forEach(c => this.listaComite.agregar(c));

    this.intervalo = setInterval(() => {
      this.listaMedicos.rotar();
    }, 10000);
  }

  agregarPaciente(nombre: string): void {
    if (!nombre.trim()) return;
    this.listaPacientes.agregar(nombre.trim());
  }

  atenderPaciente(): void {
  const atendido = this.listaPacientes.atenderPrimero();
  if (atendido) {
    const medico = this.listaMedicos.actual?.nombre ?? 'Sin asignar';
    this.listaHistorial.agregar(atendido, medico);
  }
  }

  rotarMedico(): void {
    this.listaMedicos.rotar();
  }

  avanzarComite(): void {
    this.listaComite.avanzar();
  }

  retrocederComite(): void {
    this.listaComite.retroceder();
  }
}