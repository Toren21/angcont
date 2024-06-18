import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { requestService } from '../../requestService';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-expense-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-popup.component.html',
  styleUrl: './expense-popup.component.css'
})
export class ExpensePopupComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ExpensePopupComponent>, private req: requestService, private _snackBar: MatSnackBar
  ) { }



  ngOnInit(): void {



  }
  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(form: any, type: string, code: string, reqType: string) {

      if(type == 'update'){
      form.value.code = code;

      for (let key in form.value) {
        if (form.value[key] === '' || form.value[key] === null || form.value[key] === undefined) {
            delete form.value[key];
        }
    }

}

      this.req.sendPost(form.value,
      `api/v1/${reqType}/${type}`).subscribe(
        (res: any) => {
          this.dialogRef.close();
          this.openSnackBar(`POST ${type} ${reqType} success`,'OK');
        },
        (error: any) => {
          console.error('Error occurred:', error);
          this.openSnackBar(`POST ${type} ${reqType} error`,'OK');
        }
      );
    }

  closePopup(): void {
    this.dialogRef.close();

  };
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,

    });
  }

}
