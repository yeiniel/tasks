import { TestBed } from '@angular/core/testing';
import { Provider } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Auth,
          useValue: Math.random()
        }
      ] as Provider[]
    });
    service = TestBed.inject(AuthService);

    service.signInWithEmailAndPasswordFn = jest.fn(() => Promise.resolve()) as never;
  });

  it('should call signInWithEmailAndPassword with correct arguments', async () => {
    const email = `user-${Math.floor(Math.random() * 1000)}@server.tld`;
    const password = `secret-${Math.random()}`;

    await service.authenticate(email, password);

    expect(service.signInWithEmailAndPasswordFn).toHaveBeenCalledWith(
      TestBed.inject(Auth), email, password
    );
  });
});
