import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'tasks',
        loadChildren: () => import('./tasks/tasks.routes')
            .then(m => m.routes)
    }
];
