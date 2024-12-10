import { Component } from '@angular/core';
import { Sections } from './sections';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  sectionList = Sections;
  activeItem : number = 1;
  currentComponent: any = Sections[0].Component;
  constructor() {
   }

   setActiveItem(id: number): void {
    this.activeItem = id;
    const selectedSection = this.sectionList.find(section => section.id === id);
    this.currentComponent = Sections[selectedSection!.id-1].Component;
  }
  
}
