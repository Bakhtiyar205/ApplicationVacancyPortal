import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-application-form',
  standalone: true, 
  imports: [ReactiveFormsModule, NgClass, CommonModule], 
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css'],
})
export class ApplicationFormComponent implements OnInit, OnChanges {
  applicationForm: FormGroup;
  @Input() vacancyId: number = 0;

  constructor(private fb: FormBuilder) {
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
    if (this.applicationForm.valid) {
      console.log(this.applicationForm.value);
    } else {
      console.log('Form is not valid'); 
    }
  }
}
