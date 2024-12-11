import { Component, OnInit } from '@angular/core';
import { UpdateQuestionOption } from '../../../questionOption/update.questionOption.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionOptionService } from '../../../questionOption/question-option.service';
import { QuestionService } from '../../../questions/question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-option-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './question-option-update.component.html',
  styleUrl: './question-option-update.component.css'
})
export class QuestionOptionUpdateComponent implements OnInit {
  questionOption: UpdateQuestionOption = {
    id: 0,
    questionId: 0,
    option: '',
    isAnswer: false
  }

  questionOptionForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  questionList: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, 
              public questionOptionService: QuestionOptionService, public questionService: QuestionService) 
  { 
    this.questionOptionForm = this.fb.group({
      id: [this.questionOption.id, Validators.required],
      questionId: [this.questionOption.questionId, Validators.required],
      option: [this.questionOption.option, [Validators.required, Validators.minLength(3)]],
      isAnswer: [this.questionOption.isAnswer, Validators.required]
    });
  }

  ngOnInit(): void {
    this.questionOption.id = +this.route.snapshot.paramMap.get('id')!;
    this.questionOptionService.getQuestionOptionById({ id: this.questionOption.id }).subscribe({
      next: (response) => {
        this.questionOption = response;
        console.log(response);
        this.questionOptionForm.patchValue(this.questionOption);
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'An error occurred during submission';
        this.showMessageForDuration(this.errorMessage, 5000);
      }
    });

    this.questionService.getQuestions({ pageNumber: 0, pageSize: 10 }).subscribe({
      next: (response) => {
        this.questionList = response;
        console.log(response)
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'An error occurred during submission.';
        this.showMessageForDuration(this.errorMessage, 5000);
      }
    })

  }

  onSubmit(): void {
    if(this.questionOptionForm.valid){
      this.submitted = true;
      const questionOption = this.questionOptionForm.value;

      this.questionOptionService.updateQuestionOption(questionOption).subscribe({
          next: () => {
            console.log(questionOption);
            console.log('Question Option updated successfully!');
            this.showMessageForDuration('Question Option updated successfully!', 5000);
          },
          error: (err) => {
        console.log(err.error);

            this.errorMessage = err.error?.detail || 'An error occurred during submission.';
            this.showMessageForDuration(this.errorMessage, 5000);
          }
        });
      }
    }

    private showMessageForDuration(message: string, duration: number): void {
      setTimeout(() => {
        this.submitted = false;  
        this.errorMessage = '';  
      }, duration);
    }
}


