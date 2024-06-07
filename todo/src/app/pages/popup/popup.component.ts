import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { requestService } from '../../requestService';

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
    private dialogRef: MatDialogRef<PopupComponent>, private req: requestService
  ) { }

  closePopup(): void {
    this.dialogRef.close();

  };

  onSubmit(form: any) {
    console.log(form.value);
    if(form.value[0] != '')
      this.req.sendPost(form.value, 'api/v1/clients/create').subscribe(
        (res: any) => {
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );
      else{
        console.error('Inavalid data');
      }


  }

}
