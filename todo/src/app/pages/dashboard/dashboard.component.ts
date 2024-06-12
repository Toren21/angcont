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


      this.req.sendGet('api/v1/monthly/income').subscribe(
      (res: any) => {



        const previousMonthIncome = res.map((item: { previousMonthIncome: any; }) => item.previousMonthIncome);
        const currentMonthIncome = res.map((item: { currentMonthIncome: any; }) => item.currentMonthIncome);
        const days = res.map((item: { day: any; }) => item.day);

        this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Previous Month Income',
                        data: previousMonthIncome,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgb(51, 102, 255, 0.7)',
                    },
                    {
                        label: 'Current Month Income',
                        data: currentMonthIncome,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgb(0, 204, 0, 0.7)',
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

     this.req.sendGet('api/v1/monthly/expenses').subscribe(
      (res: any) => {



        const previousMonthExpense = res.map((item: { previousMonthExpense: any; }) => item.previousMonthExpense);
        const currentMonthExpense = res.map((item: { currentMonthExpense: any; }) => item.currentMonthExpense);
        const days = res.map((item: { day: any; }) => item.day);

        this.chart1 = new Chart('canvas2', {
            type: 'bar',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Previous Month Expenses',
                        data: previousMonthExpense,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgb(51, 102, 255, 0.7)',
                    },
                    {
                        label: 'Current Month Expenses',
                        data: currentMonthExpense,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgb(0, 204, 0, 0.7)',
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


