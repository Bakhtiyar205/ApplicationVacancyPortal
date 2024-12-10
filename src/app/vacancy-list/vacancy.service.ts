import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacancyService extends AppService{

  constructor(public override http: HttpClient) {
    super(http);
   }

   public getVacancyDetails(id: string): Observable<any> {
      return this.get(this.http, `vacancy/${id}`);    
   }
}
