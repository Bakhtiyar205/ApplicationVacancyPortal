import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../person/person.service';
import { Person } from '../../../person/person.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-detail',
  imports: [CommonModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent implements OnInit {
  person: Person | any;
  errorMessages: string = '';
  id: number = 0;


  constructor(public personService: PersonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!; 
    this.getPersonDetail(this.id);
    console.log('ID:', this.id);
  }

  getPersonDetail(id: number){
    this.personService.getById({id: id})
    .subscribe({
      next: (response) => {
        this.person = response;
        console.log('Person:', response);
        console.log('Person:', this.person.personVacancies);
      },
      error: (err) => {
        this.errorMessages = err.error?.detail || 'An error occurred during submission.';
        console.log('Error:', this.errorMessages);
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
