import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamRequirementService extends AppService {

  constructor(public override http: HttpClient) {
    super(http);
   }

   public getExamRequirements(data: any) {
      return this.get(this.http, 'examRequirement', data);
   }
}
