import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatarialModule } from '../../../shared/matarial/matarial.module';
import { SharedModule } from '../../../shared/shared/shared.module';
import { FormControl, Validators, } from '@angular/forms';
 import { ErrorStateMatcher } from '@angular/material/core';

 import {MatIconModule} from '@angular/material/icon';
 import {MatDividerModule} from '@angular/material/divider';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatDividerModule,MatIconModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();


}


import {

  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
