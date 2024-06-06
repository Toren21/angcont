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



  async onSubmit(form: any): Promise<void> {
    const username = form.value.fname;
    const password = form.value.lname;

    try {
      const res: any = await this.req.sendPost({username, password});
      this.cookieService.set('token', res.token, 1);
      this.router.navigate(['/main']);

    } catch (error) {
      console.error('Error occurred:', error);
    }

   }
}
