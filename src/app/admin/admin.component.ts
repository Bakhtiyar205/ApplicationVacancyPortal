import { Component } from '@angular/core';
import { Sections } from './sections';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  sectionList = Sections;
  activeItem : number = 1;
  constructor() {
   }

   setActiveItem(id: number): void {
    this.activeItem = id;
    const selectedSection = this.sectionList.find(section => section.id === id);
  }
  
}
