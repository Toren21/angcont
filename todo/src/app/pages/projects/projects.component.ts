import { Component, OnInit } from '@angular/core';
import { requestService } from '../../requestService';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  projects: any[] = [];
  constructor(private req : requestService, private _snackBar: MatSnackBar,public dialog: MatDialog){};


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,

    });
  }


  async ngOnInit(): Promise<void>  {


      const data = this.req.sendGet('api/v1/projects/getAll').subscribe(
        (res: any) => {
          this.projects = res;
          this.openSnackBar('GET Projects success', 'OK');
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );

    }
    openPopup(client: any, type : string, code:string, reqType: string): void {
      this.dialog.open(PopupComponent, {
        width: '400px',
        data: [this.req.ProjectModelExample(), type, code, reqType],
        panelClass: 'custom-dialog-container'
      });
    }

    deleteElement(code : string): void {
      const data = this.req.sendDelete('api/v1/projects/delete', code).subscribe(
        (res: any) => {
          this.updateData();
          this.openSnackBar(`DELETE ${code} success`,'OK');
        },
        (error: any) => {
          this.openSnackBar(`DELETE ${code} error`,'OK');
          console.error('Error occurred:', error);
        }
      );
    };


    updateData(): void {
      const data = this.req.sendGet('api/v1/projects/getAll').subscribe(
        (res: any) => {
          this.projects = res;
          this.openSnackBar(`GET projects success`,'OK');
        },
        (error: any) => {
          this.openSnackBar(`GET project success`,'OK');
          console.error('Error occurred:', error);
        }
      );
    }



}
