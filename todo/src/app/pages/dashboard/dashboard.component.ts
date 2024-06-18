import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { requestService } from '../../requestService';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js/auto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { PdfGenerateComponent } from '../pdf-generate/pdf-generate.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  chart: any = [];
  chart1: any = [];
  chart2: any = [];

  project: number = 0;
  product: number = 0;
  client: number = 0;

  incomes: number = 0;
  expenses: number = 0;

  constructor(private req: requestService, public dialog: MatDialog, private _snackBar: MatSnackBar) {


  };


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,

    });
  }



  onSubmit(form: any) {

    console.log(form.value);

    this.getSummary(form.value.date.split('-')[1], form.value.date.split('-')[0]);

    this.chart2.update();
  }
  async ngOnInit(): Promise<void> {

    var date = new Date();


    this.req.sendGet(`api/v1/monthly/incomes?month=${date.getMonth() + 1}&year=${date.getFullYear()}`).subscribe(
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


        this.openSnackBar('GET Profit success', 'Ok');
      },
      (error: any) => {
        console.error('Error occurred:', error);
        this.openSnackBar('GET Profit error', 'Ok');
      }
    );

    this.req.sendGet(`api/v1/monthly/expenses?month=${date.getMonth() + 1}&year=${date.getFullYear()}`).subscribe(
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


        this.openSnackBar('GET Profit success', 'Ok');
      },
      (error: any) => {
        console.error('Error occurred:', error);
        this.openSnackBar('GET Profit error', 'Ok');
      }
    );

    this.req.sendGet(`api/v1/monthly/summary?month=${date.getMonth() + 1}&year=${date.getFullYear()}`).subscribe(
      (res: any) => {

        this.incomes = res[0].monthIncome;
        this.expenses = res[0].monthExpense;
        this.chart2 = new Chart('canvas3', {
          type: 'pie',
          data: {
            labels: ['Incomes', 'Expenses'],
            datasets: [{
              label: 'Amount',
              data: [res[0].monthIncome, res[0].monthExpense],
              backgroundColor: ['#76B245', '#E95B5B'],

              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                enabled: true,
              },

            }
          },

        });
        this.openSnackBar('GET Profit success', 'Ok');
      },
      (error: any) => {
        console.error('Error occurred:', error);
        this.openSnackBar('GET Profit error', 'Ok');
      }
    );

    this.req.sendGet(`api/v1/clients/count`).subscribe(
      (res: any) => {
        this.client = res.count;

      },
      (error: any) => {

      }
    );

    this.req.sendGet(`api/v1/projects/count`).subscribe(
      (res: any) => {
        this.project = res.count;

      },
      (error: any) => {

      }
    );

    this.req.sendGet(`api/v1/products/count`).subscribe(
      (res: any) => {
        this.product = res.count;

      },
      (error: any) => {

      }
    );



  }


  async getSummary(mounth: number, year: number) {

    this.req.sendGet(`api/v1/monthly/summary?month=${mounth}&year=${year}`).subscribe(
      (res: any) => {

        this.incomes = res[0].monthIncome;
        this.expenses = res[0].monthExpense;
        this.chart2.data.datasets[0].data = [res[0].monthIncome, res[0].monthExpense];


        this.chart2.update();

      },
      (error: any) => {
        console.error('Error occurred:', error);
        this.openSnackBar('GET Profit error', 'Ok');
      }
    );


  }


  async updateCharts() {

    const img = document.querySelector('.head-content img');

    if (img) {
      img.classList.add('rotate');

      img.addEventListener('animationend', () => {
        img.classList.remove('rotate');
      }, { once: true });
    } else {
      console.error('Image element not found');
    }



  }

  openPopup(type: string, code: string, reqType: string): void {
    this.dialog.open(PdfGenerateComponent, {
      width: '400px',
      data: [type, code, reqType],
      panelClass: 'custom-dialog-container'
    });
  }

}


