import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';
import { HttpClient } from '@angular/common/http';
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
}
