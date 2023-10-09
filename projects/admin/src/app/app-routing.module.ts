import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {

    path:'login',loadComponent:()=>import('./auth/components/login/login.component').then(c=>c.LoginComponent),
    title:'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
