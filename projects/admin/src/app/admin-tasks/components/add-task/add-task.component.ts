import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { SharedModule } from '../../../shared/shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddForm } from '../../Repository/AddFrom';
import { IRepoForm } from '../../Repository/IRepoForm';
import { EditForm } from '../../Repository/EditForm';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  formGroup!: FormGroup;
  isImageValid = true;
  imagePath!: string;
  repo!: IRepoForm;
  createReaLChangeData:any;
  constructor(private fb: FormBuilder, private _task: TaskService, public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,public confirmationDialog:MatDialog) {

  }
  ngOnInit(): void {
    if (this.dialogData) {
     this.repo= new EditForm(this.fb, this._task, this.formGroup, this.dialogRef, this.dialogData,this.confirmationDialog)
    }
    else {
      this.repo=new AddForm(this.fb, this._task, this.formGroup, this.dialogRef);
    }
    this.formGroup = this.repo.initForm(this.dialogData);


  }
  selectImage(Image: HTMLInputElement) {
    if (Image.files?.length) {
      this.formGroup.get('image')?.setValue(Image.files[0])
      this.imagePath = Image.files[0].name
    }
  }

  addTask() {
    this.isImageValid = this.formGroup.get('image')?.hasError('required') ? false : true;
    let formData = new FormData();
    formData = this.repo.convertFormGroupToFormData( this.formGroup);
    this.repo.sendRequest(formData);
    this.createReaLChangeData = this.repo.createReaLChangeData(formData);
    this.repo.closeDialog(this.createReaLChangeData);
  }
  closeDialog() {
    this.repo.closeDialog();
  }
}
