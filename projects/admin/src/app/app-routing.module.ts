import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { addTask, listTasks, login, nav } from './conts/mylinks';

const routes: Routes = [
  {
    path: '', redirectTo: login, pathMatch: 'full'
  },
  {
    path: login, loadComponent: () => import('./auth/components/login/login.component').then(c => c.LoginComponent),
    title: login
  },

  {
    path: nav, loadComponent: () => import('./main-layout/components/navbar/navbar.component').then(c => c.NavbarComponent),
    title: 'navbar',
    children: [
      {
        path: '', redirectTo: listTasks, pathMatch: 'full'
      },
      {
        path: listTasks, loadComponent: () => import('./admin-tasks/components/list-task/list-task.component').then(c => c.ListTaskComponent),
        title: 'all tasks',
      },
      {
        path: addTask, loadComponent: () => import('./admin-tasks/components/add-task/add-task.component').then(c => c.AddTaskComponent),
        title: 'add task',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
