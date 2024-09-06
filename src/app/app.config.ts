import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideFirebaseApp(() => initializeApp({"projectId":"tasks-e2afc","appId":"1:331315003672:web:f8215136f25c022a615e6d","storageBucket":"tasks-e2afc.appspot.com","apiKey":"AIzaSyCCTx26zqtaYjD0crWWTKF6uTAQarUlojI","authDomain":"tasks-e2afc.firebaseapp.com","messagingSenderId":"331315003672"})), 
    provideAuth(() => {
      const auth = getAuth();

      connectAuthEmulator(auth, 'http://localhost:9099');

      return auth;
    }), 
    provideFirestore(() => {
      const firestore = getFirestore();

      connectFirestoreEmulator(firestore, 'localhost', 8080);

      return firestore;
    })
  ]
};
