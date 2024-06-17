import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { requestService } from '../../requestService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-last-tranz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-last-tranz.component.html',
  styleUrl: './popup-last-tranz.component.css'
})
export class PopupLastTranzComponent {

  clientData: any;
  history: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PopupLastTranzComponent>, private req: requestService, private _snackBar: MatSnackBar
  ) { }



  ngOnInit(): void {
    this.req.sendGet(`api/v1/clients/getOne?code=${this.data[0]}`).subscribe(
      (res: any) => {
        this.clientData  = res;
       // this.openSnackBar(`Delete ${code} success`,'OK');
      },
      (error: any) => {
       // this.openSnackBar(`Delete ${code} error`,'OK');
       // console.error('Error occurred:', error);
      }
    );

    this.req.sendGet(`api/v1/sales/history?code=${this.data[0]}`).subscribe(
      (res: any) => {
        this.history = res;
       // this.openSnackBar(`Delete ${code} success`,'OK');
      },
      (error: any) => {
       // this.openSnackBar(`Delete ${code} error`,'OK');
       // console.error('Error occurred:', error);
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
