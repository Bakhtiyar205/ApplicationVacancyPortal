import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
  id = 41;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
  }

  // Handle file selection
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  // Submit the form with the selected file
  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('cv', this.selectedFile, this.selectedFile.name);

    // Call the upload method (replace with your actual API endpoint)
    this.uploadFile(formData).subscribe({
      next: () => {
        this.uploadStatus = 'success';
      },
      error: () => {
        this.uploadStatus = 'error';
      }
    })
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.put('http://localhost:5025/api/person/cv/31', formData);
  }
}
