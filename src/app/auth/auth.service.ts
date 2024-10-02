import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public signInWithEmailAndPasswordFn: typeof signInWithEmailAndPassword = signInWithEmailAndPassword;

  constructor(private auth: Auth) {}

  public async authenticate(email: string, password: string): Promise<void> {
    await this.signInWithEmailAndPasswordFn(this.auth, email, password);
  }
}
