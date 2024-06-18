import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { requestService } from '../../requestService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdf-generate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pdf-generate.component.html',
  styleUrl: './pdf-generate.component.css'
})
export class PdfGenerateComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PdfGenerateComponent>, private req: requestService, private _snackBar: MatSnackBar
  ) { }


  transactionType: string = '';
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

    if (type == 'update') {
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
          this.openSnackBar(`POST ${type} ${reqType} success`, 'OK');
        },
        (error: any) => {
          console.error('Error occurred:', error);
          this.openSnackBar(`POST ${type} ${reqType} error`, 'OK');
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
