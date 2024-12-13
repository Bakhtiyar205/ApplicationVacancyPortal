import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from '../person/person.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upload-cv',
  imports: [CommonModule],
  templateUrl: './upload-cv.component.html',
  styleUrl: './upload-cv.component.css'
})
export class UploadCvComponent implements OnInit {
  selectedFile: File | null = null;
  fileName: string | null = null;
  uploadStatus: 'success' | 'error' | null = null;
  id: string = '';
  isUploading: boolean = false; 
  queryParams: any;

  constructor(private http: PersonService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      console.log('Received query params:', this.queryParams);
    });
    this.id = this.queryParams.personId;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  onSubmit(event: any): void {
    event.preventDefault();

    if (!this.selectedFile) {
      return;
    }
    const formdata: FormData = new FormData();
    formdata.set('file', this.selectedFile);
    formdata.set('data',this.id);

    this.isUploading = true;

    this.uploadFile(formdata).subscribe({
      next: () => {
        this.uploadStatus = 'success';
      },
      error: (err) => {
        console.error(err);
        this.isUploading = false;
        this.uploadStatus = 'error';
      }
    })
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.uploadCv(formData);
  }
}
