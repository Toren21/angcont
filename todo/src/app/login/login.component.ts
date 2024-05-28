import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private cookieService: CookieService, private router: Router) {}

  onSubmit(form: any): void {
    const username = form.value.fname;
    const password = form.value.lname;
    console.log(form.value);
    if (username === 'admin' && password === 'admin') {
      this.cookieService.set('token', 'example-token', 0.01);
      this.router.navigate(['/main-component']);
    } else {
      alert('Invalid credentials');
    }
  }
}
