import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { Provider } from '@angular/core';

import { TasksRepositoryService } from './tasks-repository.service';
import { collectionDataToken } from './collection-data.token';
import { collectionToken } from './collection.token';
import { Task } from './task';

describe(TasksRepositoryService.name, () => {
  let service: TasksRepositoryService;
  let collectionFn: jest.SpyInstance;

  beforeEach(() => {
    const numTasks = Math.floor(Math.random() * 100);
    const tasks: Task[] = [];
    for (let i = 0; i< numTasks; i++) {
      tasks.push({ title: `Some task title ${i}` });
    }

    collectionFn = jest.fn(() => true);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: collectionDataToken,
          useValue: jest.fn(() => of(tasks))
        },
        {
          provide: collectionToken,
          useValue: collectionFn
        },
        {
          provide: Firestore,
          useValue: Math.random()
        }
      ] as Provider[]
    });
    service = TestBed.inject(TasksRepositoryService);
  });

  it('should call collectionData with return of calling collection', async () => {
    const collectionDataFn = TestBed.inject(collectionDataToken);

    await firstValueFrom(service.getTasks());

    expect(collectionDataFn).toHaveBeenCalledWith(
      (collectionFn as unknown as jest.SpyInstance).mock.results[0].value
    )
  });

  it('should call collection with firestore', async () => {
    const firestore = TestBed.inject(Firestore);

    await firstValueFrom(service.getTasks());

    expect(collectionFn.mock.calls[0][0]).toBe(firestore);
  });
});
