import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true

    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:SpinnerInterceptor,
      multi:true
    }
  ]
})
export class CoreModule { }
