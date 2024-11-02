import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { addDoc, collection, CollectionReference, collectionSnapshots, Firestore, QueryDocumentSnapshot } from '@angular/fire/firestore';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TasksRepositoryService {

  // optional dependencies
  public collectionFn: typeof collection = collection;
  public collectionSnapshotsFn: typeof collectionSnapshots = collectionSnapshots;
  public addDocFn: typeof addDoc = addDoc;

  private get collectionRef(): CollectionReference {
    return this.collectionFn(this.firestore, 'tasks');
  }
  
  constructor(
    private firestore: Firestore
  ) {}
  
  /** Retrieve all tasks from storage
   * 
   * Task.id is not stored as a document field, instead the document unique id
   * on firestore is used.
   */
  public getTasks(): Observable<Task[]> {
    return this.collectionSnapshotsFn(this.collectionRef).pipe(
      map((snapshots: QueryDocumentSnapshot[]) => snapshots.map(
        snapshot => ({ ...snapshot.data() as Omit<Task, 'id'>, id: snapshot.id })
      ))
    );
  }

  /** Create task */
  public createTask(task: Omit<Task, 'id'>) {
    return this.addDocFn(this.collectionRef, task);
  }
}
