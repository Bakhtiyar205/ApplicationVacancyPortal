import { Component, OnInit } from '@angular/core';
import { UpdateExamRequirement } from '../../../examRequirements/update.exam-requirement.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionService } from '../../../questions/question.service';
import { VacancyService } from '../../../vacancy-list/vacancy.service';
import { ActivatedRoute } from '@angular/router';
import { ExamRequirementService } from '../../../examRequirements/exam-requirement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requirement-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './requirement-update.component.html',
  styleUrl: './requirement-update.component.css'
})
export class RequirementUpdateComponent implements OnInit {
  requirement: UpdateExamRequirement = {
    id: 0,
    detail: ''
  }

  requirementForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, public requirementService: ExamRequirementService, public vacancyService: VacancyService){
    this.requirementForm = this.fb.group({
      id: [this.requirement.id, Validators.required],
      detail: [this.requirement.detail, [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.requirement.id = +this.route.snapshot.paramMap.get('id')!;
    this.requirementService.getExamRequirementById({ id: this.requirement.id }).subscribe({
      next: (response) => {
        this.requirement = response;
        this.requirementForm.patchValue(this.requirement);
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'An error occurred during submission';
        this.showMessageForDuration(this.errorMessage, 5000);
      }
    });
  }

  onSubmit(): void {
    if(this.requirementForm.valid){
      this.submitted = true;
      const examRequirement = this.requirementForm.value;
  
      this.requirementService.updateExamRequirements(examRequirement).subscribe({
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
