import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { PersonService } from '../../../person/person.service';

@Component({
  selector: 'app-person-list',
  imports: [RouterLink, CommonModule, FontAwesomeModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit {
  personList: any;
  faPenNib = faPenNib;

  constructor(public personServices: PersonService) 
  { }
  ngOnInit(): void {
    this.getPersons();
  }


  getPersons(){
    this.personServices.getPeople().subscribe((data) => {
      this.personList = data;
      console.log(this.personList);
    });
  }
}
