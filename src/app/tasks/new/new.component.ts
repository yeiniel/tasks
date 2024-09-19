import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

import { TasksRepositoryService } from '../tasks-repository.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks-new',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.sass'
})
export class NewComponent {
  protected formGroup = new FormGroup({
    title: new FormControl('', { validators: [Validators.required, Validators.minLength(5)] })
  });

  constructor(private tasksRepositorySvc: TasksRepositoryService) {}

  async createTask() {
    await this.tasksRepositorySvc.createTask(
      this.formGroup.value as Task
    );

    this.formGroup.reset();
  }
}
