import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../vacancy.service';
import { ActivatedRoute } from '@angular/router';
import { Vacancy } from './vacancy.model';
import { CommonModule } from '@angular/common';
import { ApplicationFormComponent } from '../../shared/application-form/application-form.component';

@Component({
  selector: 'app-vacancy',
  imports: [CommonModule, ApplicationFormComponent],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.css'
})
export class VacancyComponent implements OnInit {
  vacancyFormApply: boolean = false;
  
  vacancyId: number = 0;
  vacancy: Vacancy | any;
  constructor(public vacancyServices: VacancyService,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.vacancyId = +params.get('id')!;  // Convert the id to a number and store it
      this.getVacancies();
    });
  }

  getVacancies(){
    this.vacancyServices.getVacancyDetails(this.vacancyId.toString()).subscribe((data) => {
      this.vacancy = data;
    });
  }

  vacancyApply(){
    this.vacancyFormApply = !this.vacancyFormApply;
  }
}
