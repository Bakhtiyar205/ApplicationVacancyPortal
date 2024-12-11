import { Component, OnInit } from '@angular/core';
import { UpdateQuestion } from '../../../questions/update.question.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionService } from '../../../questions/question.service';
import { VacancyService } from '../../../vacancy-list/vacancy.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './question-update.component.html',
  styleUrl: './question-update.component.css'
})
export class QuestionUpdateComponent implements OnInit {
  question: UpdateQuestion = {
    id: 0,
    questionDetail: '',
    vacancyId: 0, 
    optionCount: 0
  }

  questionForm: FormGroup;
  vacancies: any;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, public questionService: QuestionService, public vacancyService: VacancyService) {
    this.questionForm = this.fb.group({
      id: [null, Validators.required],
      questionDetail: ['', [Validators.required, Validators.minLength(3)]],
      vacancyId: [null, Validators.required],
      optionCount: [null, Validators.required]
    });

    
  }

  ngOnInit(): void {
    this.question.id = +this.route.snapshot.paramMap.get('id')!;
    this.questionService.getQuestionById({ id: this.question.id }).subscribe({
      next: (response) => {
        this.question = response;
        this.questionForm.patchValue(this.question);
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'An error occurred during submission';
      }
    })
    this.vacancyService.getVacancies({ pageNumber: 0, pageSize: 10 }).subscribe({
      next: (response) => {
        this.vacancies = response;
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'An error occurred during submission.';
      }
    })
  }

  onSubmit(): void {
    this.submitted = true;

    
    if (this.questionForm.valid) {
      const questionOption = this.questionForm.value;
      this.questionService.updateQuestion(this.questionForm.value).subscribe({
        next: () => {
          this.showMessageForDuration('Question Option created successfully!', 5000);
        },
        error: (err) => {
          this.errorMessage = err.error?.detail || 'An error occurred during submission.';
          this.showMessageForDuration(this.errorMessage, 5000);
        }
      });
      console.log('Question:', questionOption);
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
