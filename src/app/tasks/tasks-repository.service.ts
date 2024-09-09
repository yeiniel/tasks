import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

import { Task } from './task';
import { collectionDataToken } from './collection-data.token';
import { collectionToken } from './collection.token';

@Injectable({
  providedIn: 'root'
})
export class TasksRepositoryService {

  constructor(
    @Optional() @Inject(collectionDataToken) private collectionDataFn: typeof collectionData,
    @Optional() @Inject(collectionToken) private collectionFn: typeof collection,
    private firestore: Firestore
  ) {
    if (this.collectionDataFn === null) {
      this.collectionDataFn = collectionData;
    }

    if (this.collectionFn === null) {
      this.collectionFn = collection;
    }
  }

  /** Retrieve all tasks from storage */
  public getTasks(): Observable<Task[]> {
    return this.collectionDataFn(this.collectionFn(this.firestore, 'tasks')) as Observable<Task[]>
  }
}
