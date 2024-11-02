import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { Firestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Provider } from '@angular/core';

import { TasksRepositoryService } from './tasks-repository.service';
import { Task } from './task';

describe(TasksRepositoryService.name, () => {
  let service: TasksRepositoryService;
  let collectionFn: jest.Mock;
  let collectionSnapshotsFn: jest.Mock;
  let addDocFn: jest.Mock;

  beforeEach(() => {
    const numTasks = Math.floor(Math.random() * 100);
    const tasks: Task[] = [];
    for (let i = 0; i< numTasks; i++) {
      tasks.push({ title: `Some task title ${i}`, id: i });
    }

    collectionFn = jest.fn(() => true);
    collectionSnapshotsFn = jest.fn(() => of(
      tasks.map(t => ({ data: () => ({ ...t, id: undefined }), id: t.id }))
    ));
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
    service.collectionFn = collectionFn;
    service.collectionSnapshotsFn = collectionSnapshotsFn;
    service.addDocFn = addDocFn;
  });

  describe(TasksRepositoryService.prototype.getTasks.name, () => {
    it('should call collectionSnapshots with return of calling collection', async () => {
      await firstValueFrom(service.getTasks());
  
      expect(collectionSnapshotsFn).toHaveBeenCalledWith(
        (collectionFn).mock.results[0].value
      )
    });

    it('should stream the tasks collection', async () => {
      const result = await firstValueFrom(service.getTasks());
      const snapshots: QueryDocumentSnapshot[] = await firstValueFrom(service.collectionSnapshotsFn(
        service.collectionFn(TestBed.inject(Firestore), 'tasks')
      ));
      const expected = snapshots.map(s => ({ ...s.data(), id: s.id }));

      expect(result).toEqual(expected);
    });
  
    it('should call collection with firestore', async () => {
      const firestore = TestBed.inject(Firestore);
  
      await firstValueFrom(service.getTasks());
  
      expect(collectionFn.mock.calls[0][0]).toBe(firestore);
    });
  });

  describe(TasksRepositoryService.prototype.createTask.name, () => {
    it('should call addDoc with the correct parameters', async () => {
      const task = { title: `some randome title ${Math.random()}` };

      await service.createTask(task);

      expect(addDocFn).toHaveBeenCalledWith(
        (collectionFn).mock.results[0].value,
        task
      )
    });
  });
});
