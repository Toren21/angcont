import { HttpClientModule, HttpHeaders, HttpClient} from "@angular/common/http";
import {BASE_URL} from './config';
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class requestService {
  constructor(private http: HttpClient, private cookieService: CookieService){};


  sendPost(body: any, path: string): Observable<any> {
    const token = this.cookieService.get('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(`${BASE_URL}/${path}`, body, httpOptions);
  }
  //api/v1/auth/signin
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

  sendDelete(path: string, code: string): Observable<any>{
    const token = this.cookieService.get('token');

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.delete(`${BASE_URL}/${path}?code=${code}`, httpOptions);
  }


  ClientModelExample(){
        return [
          "name",
          "surname",
          "email",
          "number"
      ]
  }
  ProjectModelExample(){
    return [
      "name",
      "description",
      "status",
      "startDate",
      "endDate",
      "clientCode",
      "percentage"
  ]
}


}
