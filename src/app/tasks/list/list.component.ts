import { Component, Input } from '@angular/core';

import { Task } from '../task';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.sass'
})
export class ListComponent {
  @Input({ required: true }) public tasks!: Task[];
}
