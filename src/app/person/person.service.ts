import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './person.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends AppService {

  constructor(public override http: HttpClient) {
    super(http);
  }

  public applyForVacancy(data: Person): Observable<any> 
  {
    return this.post(this.http, 'person', data);
  }

  public getById(params: any = {}) {
    return this.get(this.http, `person/${params.id}`);
  }

  public getCv(params: { id: number }) {
    return this.get(this.http, `person/cv/${params.id}`, {observe: 'response', responseType: 'blob' });
  }
  
  public aggreExam(params: { id: number, vacancyId: number ,isAgree: boolean }): Observable<any> {
    return this.put(this.http, `person/${params.id}`, params);
  }

  public uploadCv(params: FormData): Observable<any> {
    return this.put(this.http, `person/cv`, params);
  }
}
