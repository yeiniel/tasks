import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'statusToLabel',
  standalone: true
})
export class StatusToLabelPipe implements PipeTransform {
  private readonly labels = {
    default: 'Pendiente',
    'in-progress': 'En Progreso',
    done: 'Terminado'
  };

  transform(value: Task['status']): string {
    return this.labels[value ?? 'default'];
  }
}
