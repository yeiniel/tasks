import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Provider } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let email: string;
  let password: string;
  let fixture: ComponentFixture<LoginComponent>;

  // test helpers
  const fillFormAndSubmit = () => {
    const emailDE = fixture.debugElement.query(By.css('input[id="email"]'));
    emailDE.nativeElement.value = email;
    emailDE.triggerEventHandler('input', { target: emailDE.nativeElement });

    const passwordDE = fixture.debugElement.query(By.css('input[id="password"]'));
    passwordDE.nativeElement.value = password;
    passwordDE.triggerEventHandler('input', { target: passwordDE.nativeElement });

    fixture.detectChanges();

    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);

    fixture.detectChanges();
  }

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
  });

  it('should authenticate user', () => {
    fillFormAndSubmit();

    expect(TestBed.inject(AuthService).authenticate).toHaveBeenCalledWith(email, password);
  });

  it('should navigate to the root after login', async () => {
    fillFormAndSubmit();
    
    await fixture.whenStable();

    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(['../../'])
  });
});
