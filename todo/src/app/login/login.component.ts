import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { requestService } from '../requestService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private cookieService: CookieService,
     private router: Router, private req : requestService){};



     onSubmit(form: any) {
      const username = form.value.fname;
      const password = form.value.lname;

      this.req.sendPost({ username, password }).subscribe(
        (res: any) => {
          this.cookieService.set('token', res.token, 1);
          this.router.navigate(['/main']);
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );
    }
}
