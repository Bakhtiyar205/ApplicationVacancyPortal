import { Component } from '@angular/core';
import { QuestionOption } from '../../../questionOption/questionOption.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionOptionService } from '../../../questionOption/question-option.service';
import { QuestionService } from '../../../questions/question.service';

@Component({
  selector: 'app-question-option-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './question-option-create.component.html',
  styleUrl: './question-option-create.component.css'
})
export class QuestionOptionCreateComponent {
  questionOption: QuestionOption = {
    id: 0,
    questionId: 0,
    option: '',
    isAnswer: false
  };

  questionOptionForm: FormGroup;
  questions: any;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, public questionService: QuestionService, public questionOptionService: QuestionOptionService) {
    this.questionOptionForm = this.fb.group({
      questionId: [null, Validators.required],
      option: ['', [Validators.required, Validators.minLength(3)]],
      isAnswer: [this.questionOption.isAnswer, Validators.required]
    });
  }

  ngOnInit(): void {
    this.questionService.getQuestions({ pageNumber: 0, pageSize: 10 }).subscribe({
      next: (response) => {
        this.questions = response;
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'An error occurred during submission.';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    
    if (this.questionOptionForm.valid) {
      const questionOption = this.questionOptionForm.value;
      this.questionOptionService.createQuestionOption(this.questionOptionForm.value).subscribe({
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