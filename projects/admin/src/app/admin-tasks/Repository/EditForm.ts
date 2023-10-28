import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IRepoForm } from "./IRepoForm";
import * as moment from "moment";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddTaskComponent } from "../components/add-task/add-task.component";
import { TaskService } from "../services/task.service";
import { Inject } from "@angular/core";
import { ConfirmationComponent } from "../../custome/confirmation/confirmation.component";


export class EditForm implements IRepoForm {

  constructor(private fb: FormBuilder,
    private _task: TaskService,
    private formGroup: FormGroup,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public confirmationDialog: MatDialog,
  ) {
  }

  initForm(data: any): FormGroup {
    let formGroup = this.fb.group({
      userId: [data?.userId, [Validators.required]],
      title: [data?.title, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      deadline: [moment(data?.deadline, "YYYY-MM-DD").toISOString(), [Validators.required]],
      image: [data?.image, [Validators.required]],
      description: [data?.description, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    });
    return formGroup;
  }
  convertFormGroupToFormData(formGroup: FormGroup): FormData {
    let formData = new FormData();
    Object.entries(formGroup.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        value = moment(value).format('DD-MM-YYYY')
      }
      formData.append(key, value)
    });

    return formData;
  }

  sendRequest(formData: FormData): void {
    this._task.edit(formData, this.dialogData._id).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => {
        this.createReaLChangeData(formData);
        this.closeDialog();
      }
    })
  }
  createReaLChangeData(formData: FormData) {
    const mappedData = {
      _id: this.dialogData._id,
      title: formData.get('title'),
      image: formData.get('image'),
      description: formData.get('description'),
      status: this.dialogData.status,
      user: formData.get('userId'),
      deadline: formData.get('deadline'),
      Action: '',
    }
    console.log(mappedData)
    return mappedData;
  }
  closeDialog() {
    this.dialogRef.close();


  }

}
