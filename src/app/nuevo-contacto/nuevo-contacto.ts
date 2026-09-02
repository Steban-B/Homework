import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-nuevo-contacto',
  imports: [],
  templateUrl: './nuevo-contacto.html',
  styleUrl: './nuevo-contacto.css',
})
export class NuevoContacto {
  @Output() newContact = new EventEmitter<any>();

  public name = signal<string>('');
  public phone = signal<string>('');

  changeName(e: any) {
    this.name.set(e.target.value);
  }

  changePhone(e: any) {
    this.phone.set(e.target.value);
  }

  submitContact() {
    if (this.name() && this.phone()) {
      this.newContact.emit({ name: this.name(), phone: this.phone() });
      this.name.set('');
      this.phone.set('');
    }
  }
}