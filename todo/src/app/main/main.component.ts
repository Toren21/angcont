import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
constructor(private cookieService: CookieService,
  private router: Router){};

  logOut(){
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);

  }
}
