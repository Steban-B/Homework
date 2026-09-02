import { Component, signal } from '@angular/core';
import { ListaContactos } from './lista-contactos/lista-contactos';
import { NuevoContacto } from './nuevo-contacto/nuevo-contacto';

@Component({
  selector: 'app-root',
  imports: [ListaContactos, NuevoContacto],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public loading = signal<boolean>(true);
  public contacts = signal<any[]>([]);

  constructor() {
    setTimeout(() => {
      this.contacts.set([
        { id: 1, name: 'Juan Steban', phone: '8482323' },
        { id: 2, name: 'Salchipapa', phone: '1234567890' },
        { id: 3, name: 'Casa', phone: '123' },
      ]);
      this.loading.set(false);
    }, 2000);
  }

  addContact(newContact: any) {
    this.contacts.set([...this.contacts(), { id: Date.now(), ...newContact }]);
  }

  deleteContact(id: number) {
    this.contacts.set(this.contacts().filter((c) => c.id !== id));
  }
}