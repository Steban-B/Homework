export class NodoPaciente {
  nombre: string;
  siguiente: NodoPaciente | null = null;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

export class ListaPacientes {
  cabeza: NodoPaciente | null = null;
  cola: NodoPaciente | null = null;
  longitud = 0;

  agregar(nombre: string): void {
    const nodoNuevo = new NodoPaciente(nombre);
    if (!this.cabeza) {
      this.cabeza = nodoNuevo;
    } else {
      this.cola!.siguiente = nodoNuevo;
    }
    this.cola = nodoNuevo;
    this.longitud++;
  }

  atenderPrimero(): string | null {
    if (!this.cabeza) return null;
    const atendido = this.cabeza;
    this.cabeza = this.cabeza.siguiente;
    if (!this.cabeza) this.cola = null;
    this.longitud--;
    return atendido.nombre;
  }

  obtenerArreglo(): string[] {
    const resultado: string[] = [];
    let actual = this.cabeza;
    while (actual) {
      resultado.push(actual.nombre);
      actual = actual.siguiente;
    }
    return resultado;
  }
}