import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IRepoForm } from "./IRepoForm";
import * as moment from "moment";
import { TaskService } from "../services/task.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { AddTaskComponent } from "../components/add-task/add-task.component";

export class AddForm implements IRepoForm {


  constructor(private fb: FormBuilder,
    private _task: TaskService,
    private formGroup: FormGroup,
    public dialogRef: MatDialogRef<AddTaskComponent>
  ) {
 }


  initForm(): FormGroup {
    let form = this.fb.group({
      userId: ['', [Validators.required]],

      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      deadline: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    })

    return form;
  }
  convertFormGroupToFormData(formGroup:FormGroup): FormData {
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
    this._task.add(formData).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    complete: () => {
      const data= this.createReaLChangeData(formData);
      this.closeDialog(data);
      }
    })
  }

  createReaLChangeData(formData:FormData){
    const mappedData = {
      title: formData.get('title'),
      image: formData.get('image'),
      description:formData.get('description'),
      status:'In-Progress',
      user: formData.get('userId'),
      deadline:formData.get('deadline'),
      Action: '',
    }

   return mappedData;
  }

  closeDialog(data?:any){
    this.dialogRef.close(data);
  }

}
