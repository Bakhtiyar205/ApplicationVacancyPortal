import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionOptionService extends AppService {
  public QuestionOption = 'questionOption';

  constructor(public override http: HttpClient) { 
    super(http);
  }

  getQuestionOptions(data: any) {
    return this.get(this.http, 'questionOption', data);
  }

  deleteQuestionOption(params: any = {}) {
    return this.delete(this.http, `${this.QuestionOption}/${params.id}`);
  }

  createQuestionOption(data: any) {
    return this.post(this.http, this.QuestionOption, data);
  }


}
