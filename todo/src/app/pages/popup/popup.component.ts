import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { requestService } from '../../requestService';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PopupComponent>, private req: requestService, private _snackBar: MatSnackBar
  ) { }

  closePopup(): void {
    this.dialogRef.close();

  };
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,

    });
  }

  onSubmit(form: any, type: string, code: string, reqType: string) {
    // Доделать костыль
    //console.log(code);
    if(form.value[0] != '')
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
      else{
        console.error('Invalid data');
      }


  }

}
