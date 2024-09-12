import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { TasksRepositoryService } from '../tasks-repository.service';
import { Task } from '../task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.sass'
})
export class NewTaskComponent {
  protected formGroup = new FormGroup({
    title: new FormControl('', { validators: [Validators.required, Validators.minLength(5)] })
  });

  constructor(private router: Router, private tasksRepositorySvc: TasksRepositoryService) {}

  async createTask() {
    await this.tasksRepositorySvc.createTask(
      this.formGroup.value as Task
    );

    this.router.navigateByUrl('/tasks');
  }
}
