import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { QuestionService } from '../../../questions/question.service';

@Component({
  selector: 'app-question-list',
  imports: [RouterLink, CommonModule,FontAwesomeModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent implements OnInit {
  questionList:any;
  errorMessages: string = '';
  faPenNib = faPenNib;
  faTrashCan = faTrashCan;
  constructor(public questionServices: QuestionService){
  }
  ngOnInit(): void {
    this.getQuestions();
  }
  getQuestions(){
    this.questionServices.getQuestions({pageNumber: 0, pageSize: 10}).subscribe((data) => {
      this.questionList = data;
    });
  }

  deleteQuestion(id: number): void {
    this.questionServices.deleteQuestion({id: id})
    .pipe(finalize(()=>{
      this.getQuestions();
    }))
    .subscribe({
      next: (response) => {
        console.log("Question Deleted", response);
      },
      error: (err) => {
          this.errorMessages = err.error?.detail || 'An error occurred during submission.';
          this.showMessageForDuration(this.errorMessages, 5000);
      }
    });
  }

  private showMessageForDuration(message: string, duration: number): void {
    setTimeout(() => {
      this.errorMessages = '';  
    }, duration);
  }
}

