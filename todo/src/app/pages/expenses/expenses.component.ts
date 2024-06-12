import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { requestService} from '../../requestService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  constructor(private req : requestService, private _snackBar: MatSnackBar){};
  expenses: any[] = [];
  ngOnInit(): void {
    this.updateData();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,

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



    this.req.sendGet('api/v1/expenses/getAll').subscribe((res : any) => {
      this.expenses = res;
      console.log(res);
      this.openSnackBar('GET Expenses success', 'OK');
    }, (err : any) => {
      this.openSnackBar('GET Expenses error', 'OK');
      console.error('Error occurred:', err);
    });
  }


}
