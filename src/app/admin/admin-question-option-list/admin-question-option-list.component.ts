import { Component, OnInit } from '@angular/core';
import { QuestionOptionService } from '../../questionOption/question-option.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenNib, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-question-option-list',
  imports: [RouterLink, CommonModule, FontAwesomeModule],
  templateUrl: './admin-question-option-list.component.html',
  styleUrl: './admin-question-option-list.component.css'
})
export class AdminQuestionOptionListComponent implements OnInit {

  questionOptionList: any;
  faPenNib = faPenNib;
  faTrashCan = faTrashCan;
  
  constructor(public questionOptionServices: QuestionOptionService) { }

  ngOnInit(): void {
    this.getQuestionOptions();
  }

  getQuestionOptions() {
    this.questionOptionServices.getQuestionOptions({ pageNumber: 0, pageSize: 10 }).subscribe((data) => {
      this.questionOptionList = data;
    });
  }

}
