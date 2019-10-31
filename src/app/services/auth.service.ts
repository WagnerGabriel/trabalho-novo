import { Usuario } from './../interfaces/usuario';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(usr: Usuario) {
    return this.afa.auth.signInWithEmailAndPassword(usr.email, usr.senha);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  registrar(usr: Usuario) {
    return this.afa.auth.createUserWithEmailAndPassword(usr.email, usr.senha);
  }

  getAuth() {
    return this.afa.auth;
  }

  perdiSenha(email: string) {
    return this.afa.auth.sendPasswordResetEmail(email);
  }

}
