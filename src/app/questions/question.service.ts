import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';
import { Observable } from 'rxjs';
import { CreateQuestion } from './create.question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends AppService {
  public Question = 'question';

  constructor(public override http: HttpClient) {
    super(http);
   }

   public getQuestions(data: any) {
      return this.get(this.http, `${this.Question}`, data);
   }

   public getQuestionById(data: any){
      return this.get(this.http, `${this.Question}/${data.id}`);
   }

    public deleteQuestion(params: any = {})  {
      return this.delete(this.http, `${this.Question}/${params.id}`);
    }

    public createQuestion(data: CreateQuestion){
      return this.post(this.http, this.Question, data);
    }

    public updateQuestion(data: any){
      return this.put(this.http, `${this.Question}/${data.id}`, data);
    }
}
