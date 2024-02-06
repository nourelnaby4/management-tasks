import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../shared/material/material.module';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { BaseUrl } from '../../../conts/environment';
import { IFilteration } from '../../context/DTOs';
import * as moment from 'moment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IPaginationInfo } from '../../../shared/context/DTO';
export interface PeriodicElement {
  position: number;
  name: string;
  title: string;
  user: string;
  deadline?: Date;
  image?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  displayedColumns: string[] = ['position', 'title', 'status', 'user', 'deadline', 'Action'];
  dataSources = new MatTableDataSource<any>(ELEMENT_DATA);
  baseUrl: string = BaseUrl;
  search!: string;
  filteration: IFilteration = {};
  timeOutId: any;
  paginationInfo!:IPaginationInfo;

  @ViewChild(MatPaginator) paginator!:MatPaginator

  constructor(private _task: TaskService, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.filteration.page=0;
    this.filteration.limit=10;
    this.getTasks();

  }
  searchByTiltle(title: HTMLInputElement) {
    this.filteration.keyword = title.value;
    this.callGetTaskservice()

  }

  searchByUserId(event: any) {
    this.filteration.userId = event.value;
    this.callGetTaskservice()

  }
  searchByDate( dateFrom: HTMLInputElement,dateTo:HTMLInputElement){
    if( dateTo.value.toString())
    {
      this.filteration.fromDate=moment(dateFrom.value).format("DD-MM-YYYY")
      this.filteration.toDate=moment(dateTo.value).format("DD-MM-YYYY")
      this.callGetTaskservice()

    }
  }
  onPageChange(event: PageEvent) {

    this.filteration.page=event.pageIndex;
  //  this.filteration.limit=event.pageSize;
    this.callGetTaskservice();
  }
  callGetTaskservice() {
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getTasks();
    }, 500);

  }
  getTasks() {
    this._task.getAll(this.filteration).subscribe({
      next: (res) => {
        this.dataSources = new MatTableDataSource<any>(this.mappedTasks(res.tasks));
        this.dataSources.paginator=this.paginator;
      },
      error: (err) => console.log(err),
      complete: () => console.log('success')
    })
  }

  deleteTask(id: any) {
    this._task.delete(id).subscribe({
      next: (res) => {
        this.dataSources.data = this.dataSources.data.filter(x => x._id !== id)
      },
      error: (err) => console.log(err),
      complete: () => console.log('success')
    })
  }


  mappedTasks(data: any[]): PeriodicElement[] {
    data = data.map(item => {
      return {
        ...item,
        user: item.userId.username,
      }
    })
    return data;
  }

  addNewTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',

    });


    dialogRef.afterClosed().subscribe(res => {
      if (res) {

        this.dataSources.data = [...this.dataSources.data, res];
      }
    })
  }


  updateTask(element: any): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: element

    });


    dialogRef.afterClosed().subscribe(res => {
      if (res) {

        this.dataSources.data = [res, ...this.dataSources.data.filter(x => x._id !== res._id)];
      }
    })
  }
}
