import { Component, Inject } from '@angular/core';
import { requestService } from '../../requestService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-mail-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mail-popup.component.html',
  styleUrl: './mail-popup.component.css'
})
export class MailPopupComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MailPopupComponent>, private req: requestService, private _snackBar: MatSnackBar
  ) { }



  ngOnInit(): void {



  }


  onSubmit(form: any) {

    console.log(form.value);

      this.req.sendPost(form.value,
      `api/v1/email/send`).subscribe(
        (res: any) => {
          this.dialogRef.close();
          this.openSnackBar(`POST Mail success`,'OK');
        },
        (error: any) => {
          console.error('Error occurred:', error);
          this.openSnackBar(`POST Mail error`,'OK');
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
