import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(6)]),
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^\\d{9}$')]), 
      password: new FormControl('', [Validators.required, Validators.minLength(8)]), 
      confirmacionpassword: new FormControl('', Validators.required)
    }, {
      validator: this.passwordsMatch('password', 'confirmacionpassword')
    });
  }

  ngOnInit() {}

  passwordsMatch(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(passwordKey);
      const confirmPasswordControl = formGroup.get(confirmPasswordKey);

      if (!passwordControl || !confirmPasswordControl) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordsMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  async guardar() {
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        message: 'Debes llenar todos los campos correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const f = this.formularioRegistro.value;

    const usuario = {
      nombre: f.nombre,
      correo: f.correo,
      telefono: f.telefono,
      password: f.password
    };

    const loading = await this.loadingController.create({
      message: 'Registrando...',
      spinner: 'crescent'
    });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('ingresado', 'true');
      const successAlert = await this.alertController.create({
        message: 'Registro guardado exitosamente',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot('login');
          }
        }]
      });
      await successAlert.present();
    }, 2000);
  }
}
