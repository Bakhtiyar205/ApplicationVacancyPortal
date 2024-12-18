import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../person/person.service';
import { Person } from '../../../person/person.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { HttpsService } from '../../../services/https/https.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-person-detail',
  imports: [CommonModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent implements OnInit {
  person: Person = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    cvPath: '',
    correctAnswers: 0,
    totalAnswers: 0, 
    personVacancies: [],
  };
  errorMessages: string = '';
  id: number = 0;
  appType: string = '';


  test: Blob | any;


  constructor(public personService: PersonService, private route: ActivatedRoute, public http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!; 
    this.getPersonDetail(this.id);
    console.log('ID:', this.id);
  }

  getPersonDetail(id: number){
    console.log('ID:', id);
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

  getPersonCv(id: number): void {
    this.personService.getCv({ id })
      .subscribe({
        next: (response) => {
          
          console.log(response.type)
          this.test = new Blob([response], {type: 'application/pdf'});

          var downloadURL = window.URL.createObjectURL(response);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = "app.pdf";
          link.click();
        },
        error: (err) => {
          console.error('Error while downloading CV:', err);
          this.errorMessages = 'Failed to download the CV.';
          this.showMessageForDuration(this.errorMessages, 5000);
        }
      });
  }

  download(id: number) {
    this.http.get('http://'+environment.host + 'person/cv/' + id, 
        {observe: 'response', responseType: 'blob' }).subscribe({
      next: (response: any) => {
        const contentType = response.headers.get('Content-Type');
          console.log('Content-Type:', contentType);

          switch (contentType) {
            case 'application/pdf':
              this.appType='PDF';
              break;
    
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              this.appType='DOCX';
              break;
    
            case 'application/msword':
              this.appType='DOC';
              break;
    
            default:
              
              break;
          }
        this.test= new Blob([response.body],{type:contentType});

        var downloadURL = window.URL.createObjectURL(this.test);
        var link = document.createElement('a');
        link.href = downloadURL;
        if(this.appType !== null){
          link.download = 'app.'+this.appType;
          link.click();
        }
      },
      error: (err) => {
        console.error('Error while downloading CV:', err);
        this.errorMessages = 'Failed to download the CV.';
        this.showMessageForDuration(this.errorMessages, 5000);
      }
  })
  }
  

  private showMessageForDuration(message: string, duration: number): void {
    setTimeout(() => {
      this.errorMessages = '';  
    }, duration);
  }

}
