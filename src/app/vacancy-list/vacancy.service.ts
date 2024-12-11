import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateVacancy } from './vacancy/create.vacancy.model';

@Injectable({
  providedIn: 'root'
})
export class VacancyService extends AppService{
  public Vacancy = 'vacancy';
  
  constructor(public override http: HttpClient) {
    super(http);
   }

   public getVacancyDetails(id: string): Observable<any> {
      return this.get(this.http, `Vacancy/${id}`);    
   }

    public getVacancyById(data: any): Observable<any> {
      return this.get(this.http, `${this.Vacancy}/${data.id}`);
    }

   public deleteVacancy(params: any = {})  {
    return this.delete(this.http, `${this.Vacancy}/${params.id}`);
  }

    public createVacancy(data: CreateVacancy) {
      return this.post(this.http, this.Vacancy, data);
    }

    public updateVacancy(data: any) {
      return this.put(this.http, `${this.Vacancy}/${data.id}`, data);
    }
}
