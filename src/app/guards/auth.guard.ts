import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private nav: NavController,
    private nz: NgZone
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        if (!user) {
          this.nz.run(() => this.nav.navigateRoot(['login']));
        }
        resolve(user ? true : false);
      })
    });
  }
}