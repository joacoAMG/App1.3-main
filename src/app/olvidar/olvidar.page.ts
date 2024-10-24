import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvidar',
  templateUrl: './olvidar.page.html',
  styleUrls: ['./olvidar.page.scss'],
})
export class OlvidarPage {
  name: string = '';
  submitted: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.submitted = true;
  }
}
