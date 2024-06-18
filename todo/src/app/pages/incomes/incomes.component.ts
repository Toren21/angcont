import { Component } from '@angular/core';
import { requestService} from '../../requestService';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SalePopupComponent } from '../sale-popup/sale-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.css'
})
export class IncomesComponent  {
  constructor(private req : requestService, private _snackBar: MatSnackBar, public dialog: MatDialog){};

  incomes: any[] = [];
  ngOnInit(): void {
    this.updateData();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,

    });
  }
  openPopup(client: any, type : string, code:string, reqType : string): void {
    this.dialog.open(SalePopupComponent, {
      width: '400px',
      data: [this.req.SaleModelExample(), type, code, reqType],
      panelClass: 'custom-dialog-container'
    });
  }

  updateData(){
    const img = document.querySelector('.head-content img');

    if (img) {
      img.classList.add('rotate');

      img.addEventListener('animationend', () => {
        img.classList.remove('rotate');
      }, { once: true });
    } else {
      console.error('Image element not found');
    }



    this.req.sendGet('api/v1/incomes/getAll').subscribe((res : any) => {
      this.incomes = res;
      console.log(res);
      this.openSnackBar('GET Incomes success', 'OK');
    }, (err : any) => {
      this.openSnackBar('GET Incomes error', 'OK');
      console.error('Error occurred:', err);
    });
  }

}
