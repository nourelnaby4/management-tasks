import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
const shared=[
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  HttpClientModule,
  ToastrModule.forRoot(),
  NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

]
@NgModule({
  declarations: [],
  imports: [ shared ],
  exports:[shared]
})
export class SharedModule { }
