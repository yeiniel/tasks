import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../task';
import { StatusToLabelPipe } from '../status-to-label.pipe';
import { StatusToClassPipe } from '../status-to-class.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tasks-item',
  standalone: true,
  imports: [StatusToLabelPipe, StatusToClassPipe, NgClass],
  templateUrl: './item.component.html',
  styleUrl: './item.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input({ required: true }) task!: Task;
}
