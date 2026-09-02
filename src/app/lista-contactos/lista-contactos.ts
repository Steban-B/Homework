import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lista-contactos',
  imports: [],
  templateUrl: './lista-contactos.html',
  styleUrl: './lista-contactos.css',
})
export class ListaContactos {
  @Input() contacts: any[] = [];
  @Output() deleteContact = new EventEmitter<number>();

  eliminar(id: number) {
    this.deleteContact.emit(id);
  }
}