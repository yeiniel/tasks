import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ListComponent } from './list/list.component';
import { Task } from './task';
import { TasksRepositoryService } from './tasks-repository.service';
import { NewComponent } from './new/new.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ListComponent, NewComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.sass'
})
export class TasksComponent {
  protected tasks: Signal<Task[]>;

  constructor(tasksRepositorySvc: TasksRepositoryService) {
    this.tasks = toSignal(tasksRepositorySvc.getTasks()) as Signal<Task[]>;
  }
}
