import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Provider } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { fillFormAndSubmit } from '../../testing/fill-form-and-submit';

describe('LoginComponent', () => {
  let email: string;
  let password: string;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    email = `user-${Math.floor(Math.random() * 1000)}@server.tld`;
    password = `secret-${Math.random()}`;

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            authenticate: jest.fn(() => Promise.resolve())
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        }
      ] as Provider[]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    
    fillFormAndSubmit(fixture, [
      ['input[id="email"]', email],
      ['input[id="password"]', password]
    ]);

    await fixture.whenStable();
  });

  it('should authenticate user', () => {
    expect(TestBed.inject(AuthService).authenticate)
      .toHaveBeenCalledWith(email, password);
  });

  it('should navigate to the root after login', async () => {
    expect(TestBed.inject(Router).navigate)
      .toHaveBeenCalledWith(['../../'])
  });
});
