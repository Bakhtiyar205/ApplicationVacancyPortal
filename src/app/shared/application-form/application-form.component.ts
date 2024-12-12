import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { PersonService } from '../../person/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-form',
  standalone: true, 
  imports: [ReactiveFormsModule, NgClass, CommonModule], 
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css'],
})
export class ApplicationFormComponent implements OnInit, OnChanges {
  applicationForm: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;
  @Input() vacancyId: number = 0;

  constructor(private fb: FormBuilder, public personService: PersonService, private router: Router) {
    this.applicationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?994(50|51|55|70|77)\d{7}$/)]],
      vacancyId: [this.vacancyId, [Validators.min(1), Validators.required]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vacancyId']) {
      this.applicationForm.patchValue({
        vacancyId: this.vacancyId
      });
    }
  }
  ngOnInit(): void {
    if(this.vacancyId === 0){
      this.applicationForm.patchValue({
        vacancyId: this.vacancyId, 
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;  
    this.errorMessage = '';
    console.log("vacancy id " + this.vacancyId);

    if (this.applicationForm.valid) {
      this.personService.applyForVacancy(this.applicationForm.value).subscribe({
        next: (data) => {
          this.showMessageForDuration('Form submitted successfully!', 5000);
          // this.router.navigate(['/examAggrement/', data.id]); 
          this.router.navigate(['/examAgrement'], { 
            queryParams: { personId: data.id, vacancyId: this.vacancyId }
          });

        },
        error: (err) => {
          this.errorMessage = err.error?.detail || 'An error occurred during submission.';
          this.showMessageForDuration(this.errorMessage, 5000);
        }
      });
    } else {
      this.errorMessage = 'Form is not valid.';
      this.showMessageForDuration(this.errorMessage, 5000);
    }
  }
  
  private showMessageForDuration(message: string, duration: number): void {
    setTimeout(() => {
      this.submitted = false;  
      this.errorMessage = '';  
    }, duration);
  }
}
