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


  ClientModelExample(){
        return [
          "code",
          "name",
          "surname",
          "email",
          "number"
      ]
  }
  ClientModel(code: string, name: string, surname: string, email: string, number: number): any {
      return {
        "code": code,
        "name": name,
        "surname": surname,
        "email": email,
        "number": number,
      }

  }


}
