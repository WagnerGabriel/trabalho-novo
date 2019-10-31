import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.page.html',
  styleUrls: ['./minha-conta.page.scss'],
})
export class MinhaContaPage implements OnInit {

  constructor(
    private svs: AuthService,
    private heehee: AlertController
  ) { }

  ngOnInit() {
  }

  
  async presentAlert(header, buttons, subHeader?, message?) {
    const alert = await this.heehee.create({
      header,
      subHeader,
      message,
      buttons
    });

    await alert.present();
  }

  async sair() {
    this.svs.logout();
    await this.presentAlert('Logout', ['Ok'], '', 'Deslogado com sucesso!')
  }

}
