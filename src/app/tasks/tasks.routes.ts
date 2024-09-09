import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks.component";
import { inject } from "@angular/core";
import { TasksRepositoryService } from "./tasks-repository.service";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TasksComponent,
        resolve: {
            tasks: () => inject(TasksRepositoryService).getTasks()
        }
    }
]