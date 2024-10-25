import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ApiControllerService } from '../servicios/api-controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  isLoading: boolean = false;
  usuarios:any[]=[]
  user={
    "nombre":"",
    "contrasena":""
  }

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private loadingController: LoadingController,
    private api:ApiControllerService
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {

    this.api.insertarUsuarios(this.user).subscribe(
      (data)=>{
        console.log("usuario guardado")
      },
      (error)=>{
        console.log("error")
      }
    )

    this.api.obtenerUsuarios().subscribe(
      (data)=>{
        this.usuarios=data
        console.log("los usuarios son: ",this.usuarios)
      },
      (error)=>{
        console.log("error")
      }
    )

   }

  async ingresar() {
    var f = this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);

      if (usuario.nombre === f.nombre && usuario.password === f.password) {

        this.isLoading = true;
        const loading = await this.loadingController.create({
          message: 'Iniciando sesión...',
          spinner: 'crescent', 
          duration: 2000 
        });

        await loading.present();

        setTimeout(async () => {
          await loading.dismiss();
          localStorage.setItem('ingresado', 'true');
          localStorage.setItem('nombreUsuario', f.nombre);
          this.navCtrl.navigateRoot('inicio');
        }, 2000);
      } else {
        const alert = await this.alertController.create({
          message: 'Datos Incorrectos',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        message: 'No hay datos de usuario en el almacenamiento local. Por favor, registre primero.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}
