import { Routes } from '@angular/router';

import { redirectUnauthorizedToPath } from './auth';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')
            .then(m => m.routes)
    },
    {
        path: 'tasks',
        loadChildren: () => import('./tasks/tasks.routes')
            .then(m => m.routes),
        ...redirectUnauthorizedToPath('auth')
    }
];
