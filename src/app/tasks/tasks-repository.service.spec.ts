import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Provider } from '@angular/core';

import { TasksRepositoryService } from './tasks-repository.service';
import { Task } from './task';

describe(TasksRepositoryService.name, () => {
  let service: TasksRepositoryService;
  let collectionFn: jest.SpyInstance;
  let collectionDataFn: jest.SpyInstance;
  let addDocFn: jest.SpyInstance;

  beforeEach(() => {
    const numTasks = Math.floor(Math.random() * 100);
    const tasks: Task[] = [];
    for (let i = 0; i< numTasks; i++) {
      tasks.push({ title: `Some task title ${i}` });
    }

    collectionFn = jest.fn(() => true);
    collectionDataFn = jest.fn(() => of(tasks));
    addDocFn = jest.fn(() => Promise.resolve());

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Firestore,
          useValue: Math.random()
        }
      ] as Provider[]
    });
    
    service = TestBed.inject(TasksRepositoryService);
    service.collectionFn = collectionFn as unknown as typeof collection;
    service.collectionDataFn = collectionDataFn as unknown as typeof collectionData;
    service.addDocFn = addDocFn as unknown as typeof addDoc;
  });

  describe(TasksRepositoryService.prototype.getTasks.name, () => {
    it('should call collectionData with return of calling collection', async () => {
      await firstValueFrom(service.getTasks());
  
      expect(collectionDataFn).toHaveBeenCalledWith(
        (collectionFn).mock.results[0].value
      )
    });
  
    it('should call collection with firestore', async () => {
      const firestore = TestBed.inject(Firestore);
  
      await firstValueFrom(service.getTasks());
  
      expect(collectionFn.mock.calls[0][0]).toBe(firestore);
    });
  });

  describe(TasksRepositoryService.prototype.createTask.name, () => {
    it('should call addDoc with the correct parameters', async () => {
      const task: Task = { title: `some randome title ${Math.random()}` };

      await service.createTask(task);

      expect(addDocFn).toHaveBeenCalledWith(
        (collectionFn).mock.results[0].value,
        task
      )
    });
  });
});
