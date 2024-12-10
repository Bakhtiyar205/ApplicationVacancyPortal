import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpsService } from '../https/https.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService extends HttpsService {

  constructor(public http: HttpClient) {
    super();
   }

   public getVacancies(params: any = {}): Observable<any> {  
     return this.get(this.http, 'vacancy', params);
   }

   public getPeople(params: any = {}): Observable<any> {  
    return this.get(this.http, 'person', params);
  }
}
