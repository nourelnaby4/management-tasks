import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../../conts/environment';
import { IFilteration } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  getAll(filteration: IFilteration): Observable<any> {
    let param = new HttpParams();
    Object.entries(filteration).forEach(([key,value]:any)=>{
      if(value){
        param=param.append(key,value);
      }
    })
    return this.http.get(`${BaseUrl}/tasks/all-tasks`, {
      params: param,

    });
  }

  add(data: FormData): Observable<any> {
    return this.http.post(`${BaseUrl}/tasks/add-task`, data);

  }
  edit(data: FormData, _id: string): Observable<any> {
    console.log(_id)
    return this.http.put(`${BaseUrl}/tasks/edit-task/${_id}`, data);

  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${BaseUrl}/tasks/delete-task/${id}`)
  }
}
