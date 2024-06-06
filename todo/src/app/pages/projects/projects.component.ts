import { Component, OnInit } from '@angular/core';
import { requestService } from '../../requestService';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  projects: any[] = [];
  constructor(private req : requestService){};


  async ngOnInit(): Promise<void>  {


      const data = this.req.sendGet('api/v1/projects/getAll').subscribe(
        (res: any) => {
          this.projects = res;
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );

    }

}
