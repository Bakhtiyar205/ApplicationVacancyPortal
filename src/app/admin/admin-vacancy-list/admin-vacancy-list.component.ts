import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../../vacancy-list/vacancy.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faPenNib, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin-vacancy-list',
  imports: [RouterLink, CommonModule,FontAwesomeModule],
  templateUrl: './admin-vacancy-list.component.html',
  styleUrl: './admin-vacancy-list.component.css'
})
export class AdminVacancyListComponent implements OnInit {
  vacancyList: any;
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
}
