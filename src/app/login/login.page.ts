import { AuthService } from './../services/auth.service';
import { Usuario } from './../interfaces/usuario';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, LoadingController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides, { read: '', static: true }) slides: IonSlides;

  private formEntrada: FormGroup;
  private userLogin: Usuario = {};
  private userRegister: Usuario = {};
  public ts: string;
  public is: string;
  private loading: any;
  public ions: string;
  private rxPatt: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  constructor(
    public loadingController: LoadingController,
    private fb: FormBuilder,
    private hehe: AuthService,
    private alerta: AlertController,
    private toast: ToastController) { }

  ngOnInit() {
    this.ts = 'password';
    this.is = 'eye-off';
    this.ions = 'entrar';

    this.formEntrada = this.fb.group({
      nome: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern(this.rxPatt)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    }, { updateOn: 'blur' });
  }

  // Toggle senha
  tipoSenha() { return this.ts; }
  iconeSenha() { return this.is; }
  ionSegment() { return this.ions; }
  toggleSenha() {
    if (this.ts === 'text') {
      this.ts = 'password'; this.is = 'eye-off';
    } else {
      this.ts = 'text'; this.is = 'eye';
    }
  }

  // Alternar entre login e senha, visual
  segmentChanged(event: any) {
    if (event.detail.value === 'entrar') {
      this.slides.slidePrev()
    } else {
      this.slides.slideNext()
    }
  }

  // Loading, visual
  async presentLoading() {
    this.loading = await this.loadingController.create({ message: 'Aguarde um momento..' });
    return this.loading.present();
  }

  // Mostrar alerta cadastro
  async presentAlert(header, buttons, subHeader?, message?, inputs?) {
    const alert = await this.alerta.create({
      header,
      subHeader,
      message,
      buttons,
      inputs
    });
  }

  async recuperarSenha() {
    const alert = await this.alerta.create({
      header: 'Esqueceu sua senha?',
      inputs: [{
        name: 'alertSenha',
        type: 'email'
      }],
      message: 'Caso o email esteja correto, enviaremos uma confirmação para você.',
      buttons: [{
        text: 'Enviar',
        handler: data => {
          const xd = data.alertSenha.toString();
          try {
            this.hehe.perdiSenha(xd);
          } catch (error) {
          } finally {
            this.presentAlert
          }
        }
      },
      {
        text: 'Fechar',
        handler: (data) => {
          console.log(data)
          this.alerta.dismiss();
        }
      }]
    });

    await alert.present();
  }

  // Acessar
  async login() {
    await this.presentLoading();
    this.userLogin = this.formEntrada.getRawValue() as Usuario;
    try {
      await this.hehe.login(this.userLogin)
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  // Cadastrar
  async register() {
    await this.presentLoading();
    this.userRegister = this.formEntrada.getRawValue() as Usuario;
    try {
      await this.hehe.registrar(this.userRegister)
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message,
      duration: 2500
    });

    toast.present();
  }
}
