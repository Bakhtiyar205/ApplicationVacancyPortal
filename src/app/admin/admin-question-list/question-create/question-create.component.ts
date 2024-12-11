import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateQuestion } from '../../../questions/create.question.model';
import { QuestionService } from '../../../questions/question.service';
import { VacancyService } from '../../../vacancy-list/vacancy.service';

@Component({
  selector: 'app-question-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './question-create.component.html',
  styleUrl: './question-create.component.css'
})
export class QuestionCreateComponent implements OnInit {
  question: CreateQuestion = {
    questionDetail: '',
    vacancyId: 0, 
    optionCount: 0
  }

  questionForm: FormGroup;
  vacancies: any;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, public questionService: QuestionService, public vacancyService: VacancyService) {
    this.questionForm = this.fb.group({
      questionDetail: ['', [Validators.required, Validators.minLength(3)]],
      vacancyId: [null, Validators.required],
      optionCount: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.vacancyService.getVacancies({ pageNumber: 0, pageSize: 10 }).subscribe({
      next: (response) => {
        this.vacancies = response;
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'An error occurred during submission.';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    
    if (this.questionForm.valid) {
      const questionOption = this.questionForm.value;
      this.questionService.createQuestion(this.questionForm.value).subscribe({
        next: () => {
          this.showMessageForDuration('Question Option created successfully!', 5000);
        },
        error: (err) => {
          this.errorMessage = err.error?.detail || 'An error occurred during submission.';
          this.showMessageForDuration(this.errorMessage, 5000);
        }
      });
      console.log('Question Option:', questionOption);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  
  }

  private showMessageForDuration(message: string, duration: number): void {
    setTimeout(() => {
      this.submitted = false;  
      this.errorMessage = '';  
    }, duration);
  }
}
