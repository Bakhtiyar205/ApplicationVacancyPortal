import { Component } from '@angular/core';
import { CreateExamRequirement } from '../../../examRequirements/create.exam-requirement.model';
import { ExamRequirementService } from '../../../examRequirements/exam-requirement.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requirement-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './requirement-create.component.html',
  styleUrl: './requirement-create.component.css'
})
export class RequirementCreateComponent {
  requirement: CreateExamRequirement = {
    detail: ''
  }

  examForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, public examRequirementService: ExamRequirementService){
    this.examForm = this.fb.group({
      detail: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
  if(this.examForm.valid){
    this.submitted = true;
    const examRequirement = this.examForm.value;

    this.examRequirementService.createExamRequirements(this.examForm.value).subscribe({
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