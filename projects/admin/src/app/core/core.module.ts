import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { SharedModule } from '../shared/shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';

const modelues = [
  CommonModule,
  SharedModule,
  MaterialModule
]

@NgModule({
  declarations: [],
  imports: [
    modelues
  ],
  exports: [
    modelues
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
  ,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
  ]
})
export class CoreModule { }
