import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenNib, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { VacancyService } from '../../../vacancy-list/vacancy.service';

@Component({
  selector: 'app-vacancies-list',
  imports: [RouterLink, CommonModule,FontAwesomeModule],
  templateUrl: './vacancies-list.component.html',
  styleUrl: './vacancies-list.component.css'
})
export class VacanciesListComponent implements OnInit {
  vacancyList: any;
  errorMessages: string = '';
  faPenNib = faPenNib;
  faTrashCan = faTrashCan;
  constructor(public vacancyServices: VacancyService){

  }
  ngOnInit(): void {
    this.getVacancies();
  }

  getVacancies(){
    this.vacancyServices.getVacancies({pageNumber: 0, pageSize: 10}).subscribe((data) => {
      this.vacancyList = data;
    });
  }

  deleteVacancy(id: number): void {
    this.vacancyServices.deleteVacancy({id: id})
    .pipe(finalize(()=>{
      this.getVacancies();
    }))
    .subscribe({
      next: (response) => {
        console.log("Vacancy Deleted", response);
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
