import { HttpClientModule, HttpHeaders, HttpClient} from "@angular/common/http";
import {BASE_URL} from './config';
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class requestService {
  constructor(private http: HttpClient, private cookieService: CookieService){};


  sendPost(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${BASE_URL}/api/v1/auth/signin`, body, httpOptions);
  }

 sendGet(path : string): Observable<any>{
    const token = this.cookieService.get('token');

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get(`${BASE_URL}/${path}`, httpOptions);
  }


}
