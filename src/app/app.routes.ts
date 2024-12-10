import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { VacancyComponent } from './vacancy-list/vacancy/vacancy.component';

export const routes: Routes = [
    { path: 'vacancy', component: VacancyListComponent },
    { path: 'vacancy/:id', component: VacancyComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', redirectTo: '/vacancy', pathMatch: 'full' }, // Default route
  ];
