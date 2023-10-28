import {  FormGroup } from "@angular/forms";

export interface IRepoForm {
  initForm( data?: any): FormGroup;
  sendRequest(formData: FormData): void;
  convertFormGroupToFormData(formGroup:FormGroup): FormData;
  createReaLChangeData(formData: FormData): any;
  closeDialog(data?: any): void;
}
