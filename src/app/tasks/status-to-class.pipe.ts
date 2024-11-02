import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'statusToClass',
  standalone: true
})
export class StatusToClassPipe implements PipeTransform {
  private readonly classes = {
    default: 'text-bg-secondary',
    'in-progress': 'text-bg-info',
    done: 'text-bg-success'
  };

  transform(value: Task['status']): string {
    return this.classes[value ?? 'default'];
  }
}
