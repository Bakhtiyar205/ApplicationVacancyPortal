import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VacancyService } from '../../../vacancy-list/vacancy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacancy-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vacancy-create.component.html',
  styleUrl: './vacancy-create.component.css'
})
export class VacancyCreateComponent {
  vacancyForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, public examRequirementService: VacancyService){
    this.vacancyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      examQuestionCount: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if(this.vacancyForm.valid){
      this.submitted = true;
  
      this.examRequirementService.createVacancy(this.vacancyForm.value).subscribe({
          next: () => {
            this.showMessageForDuration('Exam Requirement created successfully!', 5000);
          },
          error: (err) => {
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
