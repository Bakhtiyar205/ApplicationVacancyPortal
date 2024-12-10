import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../questions/question.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin-question-list',
  imports: [RouterLink, CommonModule,FontAwesomeModule],
  templateUrl: './admin-question-list.component.html',
  styleUrl: './admin-question-list.component.css'
})
export class AdminQuestionListComponent implements OnInit {
  questionList:any;
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
}
