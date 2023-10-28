import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared/shared.module';
import { nav } from '../../../conts/mylinks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  constructor(private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,

  ) {

  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      role: ['admin']
    });
  }
  submitLogin(formLogin: FormGroup) {

    this.auth.login(formLogin.value).subscribe({
      next: (res) =>localStorage.setItem('token',res.token),
      error: (err) => {alert(err)},
      complete: () => {

        this.toastr.success('login successfully', 'Toastr fun!');
        this.router.navigate([`/${nav}`])
      }
    })

  }
}


