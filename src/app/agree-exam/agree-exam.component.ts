import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamRequirement } from '../examRequirements/exam-requirement.model';
import { ExamRequirementService } from '../examRequirements/exam-requirement.service';

@Component({
  selector: 'app-agree-exam',
  imports: [CommonModule],
  templateUrl: './agree-exam.component.html',
  styleUrl: './agree-exam.component.css'
})
export class AgreeExamComponent implements OnInit {
  
  apply: boolean = true;
  queryParams: any;
  requirementList: any;

  constructor(public personService: PersonService, private requirementService: ExamRequirementService,
     private route: ActivatedRoute, private router: Router) {
  }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.queryParams = params;
        console.log('Received query params:', this.queryParams);
      });

      this.requirementService.getExamRequirements({pageNumber: 0, pageSize:100}).subscribe({
        next: (data) => {
          this.requirementList = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  onSubmit(): void {
    this.personService.aggreExam({id: this.queryParams.personId, vacancyId: this.queryParams.vacancyId, isAgree: this.apply}).subscribe({
      next: (data) => {
        this.router.navigate(['/personExam'],
          {queryParams: { personId: this.queryParams.personId, vacancyId: this.queryParams.vacancyId }}
        )
        console.log('Agreement submitted successfully!', data);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
