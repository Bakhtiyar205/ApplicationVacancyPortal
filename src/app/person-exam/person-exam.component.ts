import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonQuestionService } from '../personQuestion/person-question.service';
import { PersonQuestion } from '../personQuestion/person-question.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-exam',
  imports: [CommonModule],
  templateUrl: './person-exam.component.html',
  styleUrl: './person-exam.component.css'
})
export class PersonExamComponent implements OnInit {
  queryParams: any;
  personQuestions: PersonQuestion[] = [];
  currentQuestionIndex = 0; 
  selectedAnswers: { [key: number]: number } = {};
  timer: any; 
  minutes = 0; 
  seconds = 0; 
  id: number = 0;
  questionOptionId: number = 0;

  constructor(private route: ActivatedRoute, public personQuestionService: PersonQuestionService) {
  }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.queryParams = params;
      });

      this.personQuestionService
      .getQuestions({personId: this.queryParams.personId, vacancyId: this.queryParams.vacancyId}).subscribe(
        {
          next: (data: PersonQuestion[]) => {
            this.personQuestions = data;
            this.minutes = this.personQuestions.length;
          },
          error: (err) => {
            console.error(err);
          }
        })
        const minutes = this.personQuestions.length;
        this.startTimer();
    }
  onSubmit(): void {
  }

  isFormValid(): boolean {
    return this.personQuestions.every((q) => this.selectedAnswers[q.questionId] !== undefined);
  }

  onOptionSelect(personQuestionId: number, optionId: number): void {
    this.selectedAnswers[personQuestionId] = optionId;
  }

  isQuestionAnswered(): boolean {
    const currentQuestionId = this.personQuestions[this.currentQuestionIndex].id;
    return this.selectedAnswers[currentQuestionId] !== undefined;
  }

  submitAnswers(): void {
    this.stopTimer();
    this.id = this.personQuestions[this.currentQuestionIndex-1].id;
    this.questionOptionId = this.selectedAnswers[this.id];
    
    this.personQuestionService.editQuestion({id: this.id, questionOptionId: this.questionOptionId}).subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

  
  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.personQuestions.length - 1) {
      this.currentQuestionIndex++;
    }

    this.id = this.personQuestions[this.currentQuestionIndex-1].id;
    this.questionOptionId = this.selectedAnswers[this.id];
    
    this.personQuestionService.editQuestion({id: this.id, questionOptionId: this.questionOptionId}).subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(this.timer);
          this.submitAnswers();
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }
}
