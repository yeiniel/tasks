import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Task } from '../task';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input({ required: true }) public tasks!: Task[];
}
