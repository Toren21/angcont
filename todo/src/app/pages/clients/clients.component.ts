import { Component, OnInit } from '@angular/core';
import { requestService } from '../../requestService';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  clients: any[] = [];
  constructor(private req : requestService, public dialog: MatDialog){};


  async ngOnInit(): Promise<void>  {

    //console.log(this.req.ClientModel("Claeg","name","surname","email",346346));

      const data = this.req.sendGet('api/v1/clients/getAll').subscribe(
        (res: any) => {
          this.clients = res;

        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );

    }

    openPopup(client: any): void {
      this.dialog.open(PopupComponent, {
        width: '400px',
        data: this.req.ClientModelExample(),
        panelClass: 'custom-dialog-container'
      });


    }

    updateData(): void {
      const data = this.req.sendGet('api/v1/clients/getAll').subscribe(
        (res: any) => {
          this.clients = res;

        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );
    }




}
