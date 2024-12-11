import { Component, OnInit } from '@angular/core';
import { faPenNib, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { QuestionOptionService } from '../../../questionOption/question-option.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-question-option-list',
  imports: [CommonModule,RouterLink, FontAwesomeModule],
  templateUrl: './question-option-list.component.html',
  styleUrl: './question-option-list.component.css'
})
export class QuestionOptionListComponent implements OnInit {

  questionOptionList: any;
  faPenNib = faPenNib;
  faTrashCan = faTrashCan;
  errorMessages: string = '';

  constructor(public questionOptionServices: QuestionOptionService) { }

  ngOnInit(): void {
    this.getQuestionOptions();
  }

  getQuestionOptions() {
    this.questionOptionServices.getQuestionOptions({ pageNumber: 0, pageSize: 100 }).subscribe((data) => {
      this.questionOptionList = data;
    });
  }

  deleteQuestionOption(id: number) {
    this.questionOptionServices.deleteQuestionOption({id:id})
    .pipe(finalize(()=>{
      this.getQuestionOptions();
    }))
    .subscribe({
      next: (response) => {
        console.log("Question Options Deleted", response);
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
