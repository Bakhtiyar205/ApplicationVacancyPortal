import { Injectable } from '@angular/core';
import { AppService } from '../services/app/app.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonQuestionService extends AppService {
  public PersonQuestion = 'personQuestion';
  constructor(public override http: HttpClient) {
    super(http);
   }

   public getQuestions(data: any){ {
    return this.get(this.http, `${this.PersonQuestion}`, data);
    }
  }

  public editQuestion(data: any) {
    return this.put(this.http, `${this.PersonQuestion}`, data);
  }
}