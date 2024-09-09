import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => {
      const auth = getAuth();

      if (!environment.production) {
        connectAuthEmulator(auth, 'http://localhost:9099');
      }

      return auth;
    }), 
    provideFirestore(() => {
      const firestore = getFirestore();

      if (!environment.production) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }

      return firestore;
    })
  ]
};
