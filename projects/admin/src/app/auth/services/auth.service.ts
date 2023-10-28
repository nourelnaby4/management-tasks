import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { login } from '../../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(model:login):Observable<any>{
    return this.http.post('https://crud-copj.onrender.com/auth/login',model)
  }
}
