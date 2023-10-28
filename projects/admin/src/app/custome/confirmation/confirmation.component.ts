import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  bgConfirm!: string;
  bgCancel!: string;
  message!: string;
  constructor(public dialgRef: MatDialogRef<ConfirmationComponent>) {

  }
  ngOnInit(): void {
    this.bgConfirm = "bg-danger"
    this.bgCancel = "bg-success"
    this.message = "confirm to delete this item"
  }

  confirm() {
console.log('close');
    this.dialgRef.close(true);
  }

  cancel() {
    console.log('open');
    this.dialgRef.close(false);
  }

}
