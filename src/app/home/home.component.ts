import { Component } from '@angular/core';
export interface Configuracion {
  nombreUsuario: string;
  apellidoUsuario: string;
  rango: number;
  intentos: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  configuracion: Configuracion = {
    nombreUsuario: '',
    apellidoUsuario: '',
    rango: 0,
    intentos: 0,
  };
  mostrarMensajeBienvenida: boolean = false;
  intentosRestantes: number = 0;
  feedback: string = '';
  numeroAdivinar: number | undefined;
  numeroUsuario: number | undefined;
  numerosIntroducidos: number[] = [];
  botonPresionado: boolean = false;
  datosRecogidos: boolean = false;
  mostrarLista: boolean = false;
  usuarioAdivinado: boolean = false;
  recogerDatos(): void {
    if (
      this.configuracion.nombreUsuario &&
      this.configuracion.apellidoUsuario &&
      this.configuracion.rango &&
      this.configuracion.intentos
    ) {
      this.mostrarMensajeBienvenida = true;
      this.intentosRestantes = this.configuracion.intentos;
      this.numeroAdivinar = Math.floor(
        Math.random() * (this.configuracion.rango + 1)
      );
      console.log('Número aleatorio generado: ' + this.numeroAdivinar);
      this.botonPresionado = false;
      this.datosRecogidos = true;
    } else {
      alert('Por favor, complete todos los campos del formulario.');
    }
  }
  verificarNumero(): void {
    if (!this.mostrarLista) {
      this.botonPresionado = true;
      if (this.numeroUsuario === this.numeroAdivinar) {
        this.feedback = '¿Has Adivinado? : SÍ';
        this.usuarioAdivinado = true;
        console.log('Número adivinado');
      } else {
        if (
          this.numeroUsuario === undefined ||
          this.numeroUsuario < 0 ||
          this.numeroUsuario > this.configuracion.rango
        ) {
          alert(
            'El número introducido no está en el rango de números generados'
          );
        } else {
          this.intentosRestantes--;
          this.numerosIntroducidos.push(this.numeroUsuario);
          this.feedback = '¿Has Adivinado? : NO';
          if (this.botonPresionado && this.intentosRestantes === 0) {
            this.mostrarLista = true;
          } else {
            this.mostrarLista = false;
          }
        }
      }
    }
  }
}
