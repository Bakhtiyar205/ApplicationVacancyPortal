import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Vacancy } from './vacancy/vacancy.model';
import { RouterModule } from '@angular/router';
import { VacancyService } from './vacancy.service';


@Component({
  selector: 'app-vacancy-list',
  imports: [CommonModule, RouterModule ],
  templateUrl: './vacancy-list.component.html',
  styleUrl: './vacancy-list.component.css'
})
export class VacancyListComponent implements OnInit {
  constructor(public vacancyServices: VacancyService) { }
  vacancies: any;

  ngOnInit() {
    this.getVacancies();
  }


  getVacancies(){
    this.vacancyServices.getVacancies({pageNumber: 0, pageSize: 10}).subscribe((data) => {
      this.vacancies = data;
    });
  }
}
