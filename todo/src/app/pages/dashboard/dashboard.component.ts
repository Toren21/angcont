import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { requestService } from '../../requestService';
import { MatDialog } from '@angular/material/dialog';
import Chart from 'chart.js/auto';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {
  chart: any = [];
  chart1: any = [];

  constructor(private req : requestService, public dialog: MatDialog, private _snackBar: MatSnackBar){};


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,

    });
  }
  async ngOnInit(): Promise<void>  {


    const data = this.req.sendGet('api/v1/monthly/profit').subscribe(
      (res: any) => {
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: ['Previous Month','Current Month'],
            datasets: [
              {
                label: 'Income Last/Current Mounth',
                data: [res[0].previousMonthIncome, res[0].currentMonthIncome],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        this.chart1 = new Chart('canvas2', {
          type: 'bar',
          data: {
            labels: ['Previous Month','Current Month'],
            datasets: [
              {
                label: 'Income Last/Current Mounth',
                data: [res[0].previousMonthIncome, res[0].currentMonthIncome],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });


        this.openSnackBar('GET Profit success','Ok');
      },
      (error: any) => {
        console.error('Error occurred:', error);
        this.openSnackBar('GET Profit error','Ok');
      }
    );





  }
}


