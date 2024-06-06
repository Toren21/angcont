import { Component, OnInit } from '@angular/core';
import { requestService } from '../../requestService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  clients: any[] = [];
  constructor(private req : requestService){};


  async ngOnInit(): Promise<void>  {


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
