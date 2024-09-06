import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <h1>Welcome to {{title}}!</h1>
    <ul>
      @for (task of tasks(); track task.id) {
        <li>{{task.title}} <button (click)="setInProgress(task)">Set in progress</button></li> 
      } @empty {
        no hay elementos
      }
    </ul>   
  `,
  styles: [],
})
export class AppComponent {
  title = 'tasks';
  tasks: Signal<any[] | undefined>;

  constructor(private firestore: Firestore, private auth: Auth) {
    this.tasks = toSignal(collectionData(collection(firestore, 'tasks')));
  }

  async setInProgress(task: any) {
    const credentials = await signInWithEmailAndPassword(this.auth, 'user@server.tld', 'password');

    await updateDoc(doc(this.firestore, `tasks/${task.id}`), {
      status: 'in-progress',
      owner: credentials.user.uid
    })
  }
}
