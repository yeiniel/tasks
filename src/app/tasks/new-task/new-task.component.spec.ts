import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskComponent } from './new-task.component';
import { By } from '@angular/platform-browser';
import { Provider } from '@angular/core';
import { TasksRepositoryService } from '../tasks-repository.service';

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskComponent],
      providers: [
        {
          provide: TasksRepositoryService,
          useValue: {
            createTask: jest.fn(() => Promise.resolve())
          }
        }
      ] as Provider[]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store a new task', () => {
    const title = `some random title ${Math.random()}`;
    const inputDE = fixture.debugElement.query(By.css('input[id="title"]'));

    inputDE.nativeElement.value = title;
    inputDE.triggerEventHandler('input', { target: inputDE.nativeElement });

    fixture.detectChanges();

    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);

    fixture.detectChanges();

    expect(TestBed.inject(TasksRepositoryService).createTask).toHaveBeenCalledWith({
      title
    });
  });
});
