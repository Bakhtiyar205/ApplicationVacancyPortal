import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VacancyService } from '../../../vacancy-list/vacancy.service';
import { UpdateVacancy } from '../../../vacancy-list/vacancy/update.vacancy.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacancy-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vacancy-update.component.html',
  styleUrl: './vacancy-update.component.css'
})
export class VacancyUpdateComponent implements OnInit {
  updateVacancy: UpdateVacancy ={
    id: 0,
    title: '',
    description: '',
    examQuestionCount: 0
  }

  vacancyForm: FormGroup;
  submitted = false;
  errorMessage: string = '';


  constructor(private fb: FormBuilder,private route: ActivatedRoute, public vacancyService: VacancyService) 
  { 
    this.vacancyForm = this.fb.group({
      id: [this.updateVacancy.id, Validators.required],
      title: [this.updateVacancy.title, [Validators.required, Validators.minLength(3)]],
      description: [this.updateVacancy.description, [Validators.required, Validators.minLength(3)]],
      examQuestionCount: [this.updateVacancy.examQuestionCount, Validators.required]
    });
  }


  ngOnInit(): void {
    this.updateVacancy.id = +this.route.snapshot.paramMap.get('id')!;
    this.vacancyService.getVacancyById({ id: this.updateVacancy.id }).subscribe({
      next: (response) => {
        this.updateVacancy = response;
        this.vacancyForm.patchValue(this.updateVacancy);
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'An error occurred during submission';
        this.showMessageForDuration(this.errorMessage, 5000);
      }
    })
  }

  onSubmit(): void {
    if(this.vacancyForm.valid){
      this.submitted = true;
      const vacancy = this.vacancyForm.value;

      this.vacancyService.updateVacancy(vacancy).subscribe({
        next: () => {
          this.showMessageForDuration('Vacancy updated successfully!', 5000);
        },
        error: (err) => {
          this.errorMessage = err.error?.detail || 'An error occurred during submission.';
          this.showMessageForDuration(this.errorMessage, 5000);
        }
      })
      }
    }

  private showMessageForDuration(message: string, duration: number): void {
    setTimeout(() => {
      this.submitted = false;  
      this.errorMessage = '';  
    }, duration);
  }





}
