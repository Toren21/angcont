import { Component, OnInit } from '@angular/core';
import { requestService } from '../../requestService';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { PopupLastTranzComponent } from '../popup-last-tranz/popup-last-tranz.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MailPopupComponent } from '../mail-popup/mail-popup.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})

export class ClientsComponent implements OnInit {

  clients: any[] = [];
  constructor(private req : requestService, public dialog: MatDialog, private _snackBar: MatSnackBar){};

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,

    });
  }

  async ngOnInit(): Promise<void>  {

    this.updateData();

    }

    openPopup(client: any, type : string, code:string, reqType : string): void {
      this.dialog.open(PopupComponent, {
        width: '400px',
        data: [this.req.ClientModelExample(), type, code, reqType],
        panelClass: 'custom-dialog-container'
      });
    }

    openLastPopup(code : string): void {
      this.dialog.open(PopupLastTranzComponent, {
        width: '650px',
        data: [code],
        panelClass: 'custom-dialog-container'
      });
    }

    openMailPopup(code : string, email : string): void {
      this.dialog.open(MailPopupComponent, {
        width: '650px',
        data: [code, email],
        panelClass: 'custom-dialog-container'
      });
    }




    deleteElement(code : string): void {
      const data = this.req.sendDelete('api/v1/clients/delete', code).subscribe(
        (res: any) => {
          this.updateData();
          this.openSnackBar(`Delete ${code} success`,'OK');
        },
        (error: any) => {
          this.openSnackBar(`Delete ${code} error`,'OK');
          console.error('Error occurred:', error);
        }
      );
    };


    updateData(): void {

      const img = document.querySelector('.head-content img');

      if (img) {
        img.classList.add('rotate');

        img.addEventListener('animationend', () => {
          img.classList.remove('rotate');
        }, { once: true });
      } else {
        console.error('Image element not found');
      }

      this.req.sendGet('api/v1/clients/getAll').subscribe(
        (res: any) => {
          this.clients = res;
          this.openSnackBar(`GET Clients success`,'OK');
        },
        (error: any) => {
          this.openSnackBar(`GET Clients success`,'OK');
          console.error('Error occurred:', error);
        }
      );
    }




}
