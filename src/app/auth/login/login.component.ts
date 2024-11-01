import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  protected formGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  constructor(private router: Router, private authSvc: AuthService) {}

  protected async authenticate() {
    const { email, password } = this.formGroup.getRawValue() as { email: string, password: string };

    await this.authSvc.authenticate(email, password);

    await this.router.navigate(['../../'])
  }
}
