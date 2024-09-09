import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TasksComponent } from './tasks.component';
import { Task } from './task';

describe(TasksComponent.name, () => {
  let tasks: Task[];
  let fixture: ComponentFixture<TasksComponent>;

  // utilities
  const getTaskDEs = () => 
      fixture.debugElement.queryAll(By.css('[data-test-type="task"]'));

  beforeEach(async () => {
    const numTasks = Math.floor(Math.random() * 100);
    tasks = [];
    for (let i = 0; i< numTasks; i++) {
      tasks.push({ title: `Some task title ${i}` });
    }

    await TestBed.configureTestingModule({
      imports: [TasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    fixture.componentRef.setInput('tasks', tasks);

    fixture.detectChanges();
  });

  it('should show same amount of tasks as provided by the db', async () => {
    const numTasks = tasks.length;

    expect(getTaskDEs().length).toBe(numTasks);
  });

  it('should show title of each task', async () => {
    const taskDEs = getTaskDEs();
  
    for (let i = 0; i < tasks.length; i++) {
      expect(taskDEs[i].nativeElement.innerHTML).toContain(tasks[i].title);
    }
  });
});
