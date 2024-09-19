import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks.component";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TasksComponent,
    }
]