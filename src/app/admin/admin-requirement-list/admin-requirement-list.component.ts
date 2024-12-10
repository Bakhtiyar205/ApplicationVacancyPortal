import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExamRequirementService } from '../../examRequirements/exam-requirement.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenNib, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-requirement-list',
  imports: [RouterLink, CommonModule,FontAwesomeModule],
  templateUrl: './admin-requirement-list.component.html',
  styleUrl: './admin-requirement-list.component.css'
})
export class AdminRequirementListComponent implements OnInit {
  requirementList:any;
  faPenNib = faPenNib;
  faTrashCan = faTrashCan;
  errorMessages: string = '';

  constructor(public requirementServices: ExamRequirementService){
  }
  ngOnInit(): void {
    this.getRequirements();
  }

  getRequirements(){
    this.requirementServices.getExamRequirements({pageNumber: 0, pageSize: 10}).subscribe((data) => {
      this.requirementList = data;
    });
  }

  deleteRequirement(id: number): void {
    this.requirementServices.deleteExamRequirements({id: id})
    .pipe(finalize(()=>{
      this.getRequirements();
    }))
    .subscribe({
      next: (response) => {
        console.log("Requirement Deleted", response);
        this.getRequirements();
      },
      error: (err) => {
          this.errorMessages = err.error?.detail || 'An error occurred during submission.';
          this.showMessageForDuration(this.errorMessages, 5000);
      }
    });
  }

  private showMessageForDuration(message: string, duration: number): void {
    setTimeout(() => {
      this.errorMessages = '';  
    }, duration);
  }
}
