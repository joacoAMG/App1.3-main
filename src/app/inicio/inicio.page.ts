import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  nombreUsuario: string = '';

  constructor() { }

  ngOnInit() {

    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';
    console.log('Nombre de usuario en Inicio:', this.nombreUsuario); 
  }
}
