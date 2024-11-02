import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../../task';

@Component({
  selector: 'app-tasks-list-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input({ required: true }) task!: Task;
}
