export class NodoHistorial {
  paciente: string;
  medico: string;
  fecha: Date;
  siguiente: NodoHistorial | null = null;
  anterior: NodoHistorial | null = null;

  constructor(paciente: string, medico: string) {
    this.paciente = paciente;
    this.medico = medico;
    this.fecha = new Date();
  }
}

export class ListaHistorial {
  cabeza: NodoHistorial | null = null;
  cola: NodoHistorial | null = null;
  actual: NodoHistorial | null = null;
  longitud = 0;

  agregar(paciente: string, medico: string): void {
    const nodoNuevo = new NodoHistorial(paciente, medico);
    if (!this.cabeza) {
      this.cabeza = nodoNuevo;
    } else {
      nodoNuevo.anterior = this.cola;
      this.cola!.siguiente = nodoNuevo;
    }
    this.cola = nodoNuevo;
    this.actual = nodoNuevo; // siempre queda viendo el más reciente
    this.longitud++;
  }

  avanzar(): void {
    if (this.actual?.siguiente) this.actual = this.actual.siguiente;
  }

  retroceder(): void {
    if (this.actual?.anterior) this.actual = this.actual.anterior;
  }
}