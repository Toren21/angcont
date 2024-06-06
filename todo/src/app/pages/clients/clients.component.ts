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


    try {
      const data = await this.req.sendGet('api/v1/clients/getAll');
      if (Array.isArray(data)) {
        this.clients = data;
      } else {
        console.error('Expected an array but got', data);
      }
    } catch (error) {
      console.error('Error fetching clients data', error);
    }

    console.log('Clients init');
  }
}
