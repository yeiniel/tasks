import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TasksRepositoryService {

  // optional dependencies
  public collectionFn: typeof collection = collection;
  public collectionDataFn: typeof collectionData = collectionData;
  public addDocFn: typeof addDoc = addDoc;

  private get collectionRef(): CollectionReference {
    return this.collectionFn(this.firestore, 'tasks');
  }
  
  constructor(
    private firestore: Firestore
  ) {}
  
  /** Retrieve all tasks from storage */
  public getTasks(): Observable<Task[]> {
    return this.collectionDataFn(this.collectionRef) as Observable<Task[]>
  }

  /** Create task */
  public createTask(createTask: Task) {
    return this.addDocFn(this.collectionRef, createTask);
  }
}
