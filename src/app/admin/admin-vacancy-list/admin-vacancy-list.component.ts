import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../vacancy-list/vacancy.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faPenNib, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-vacancy-list',
  imports: [RouterLink, CommonModule,FontAwesomeModule],
  templateUrl: './admin-vacancy-list.component.html',
  styleUrl: './admin-vacancy-list.component.css'
})
export class AdminVacancyListComponent implements OnInit {
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
