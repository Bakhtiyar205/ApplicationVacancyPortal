import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';
import { HttpClient } from '@angular/common/http';
import { CreateExamRequirement } from './create.exam-requirement.model';

@Injectable({
  providedIn: 'root'
})
export class ExamRequirementService extends AppService {

  public ExamRequirement = 'examRequirement';

  constructor(public override http: HttpClient) {
    super(http);
   }

   public getExamRequirements(data: any) {
      return this.get(this.http, `${this.ExamRequirement}`, data);
   }

    public getExamRequirementById(data: any){
        return this.get(this.http, `${this.ExamRequirement}/${data.id}`);
    }

   public deleteExamRequirements(params: any = {})  {
    return this.delete(this.http, `${this.ExamRequirement}/${params.id}`);
   }

   public createExamRequirements(data: CreateExamRequirement){
    return this.post(this.http, this.ExamRequirement, data);
   }

    public updateExamRequirements(data: any){
      return this.put(this.http, `${this.ExamRequirement}/${data.id}`, data);
    }
}
