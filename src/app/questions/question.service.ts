import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends AppService {

  constructor(public override http: HttpClient) {
    super(http);
   }

   public getQuestions(data: any) {
      return this.get(this.http, 'question', data);
   }
}
