import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { VacancyComponent } from './vacancy-list/vacancy/vacancy.component';
import { AdminVacancyListComponent } from './admin/admin-vacancy-list/admin-vacancy-list.component';
import { AdminQuestionListComponent } from './admin/admin-question-list/admin-question-list.component';
import { AdminQuestionOptionListComponent } from './admin/admin-question-option-list/admin-question-option-list.component';
import { QuestionOptionCreateComponent } from './admin/admin-question-option-list/question-option-create/question-option-create.component';
import { AdminRequirementListComponent } from './admin/admin-requirement-list/admin-requirement-list.component';
import { QuestionOptionListComponent } from './admin/admin-question-option-list/question-option-list/question-option-list.component';
import { QuestionListComponent } from './admin/admin-question-list/question-list/question-list.component';
import { RequirementListComponent } from './admin/admin-requirement-list/requirement-list/requirement-list.component';
import { AdminPersonListComponent } from './admin/admin-person-list/admin-person-list.component';
import { PersonListComponent } from './admin/admin-person-list/person-list/person-list.component';
import { PersonDetailComponent } from './admin/admin-person-list/person-detail/person-detail.component';
import { VacancyCreateComponent } from './admin/admin-vacancy-list/vacancy-create/vacancy-create.component';
import { VacanciesListComponent } from './admin/admin-vacancy-list/vacancies-list/vacancies-list.component';
import { RequirementCreateComponent } from './admin/admin-requirement-list/requirement-create/requirement-create.component';

export const routes: Routes = [
    { path: 'vacancy', component: VacancyListComponent },
    { path: 'vacancy/:id', component: VacancyComponent },
    { path: 'admin', component: AdminComponent, children: [
      { path: 'people', component: AdminPersonListComponent,children:[
        {path: 'detail/:id', component: PersonDetailComponent},
        {path: 'list', component: PersonListComponent}
      ] },
      
      { path: 'vacancy', component: AdminVacancyListComponent, children:[
        {path: 'create', component: VacancyCreateComponent},
        {path: 'list', component: VacanciesListComponent}
      ] },
      
      { path: 'question', component: AdminQuestionListComponent, children: [
        {path: 'create', component: QuestionListComponent},
        {path: 'list', component: QuestionListComponent}
      ]},

      { path: 'questionOption', component: AdminQuestionOptionListComponent, children:[
        {path: 'create', component: QuestionOptionCreateComponent},
        {path: 'list', component: QuestionOptionListComponent}
      ]},
      { path: 'examrequirement', component: AdminRequirementListComponent, children:[
        {path: 'create', component: RequirementCreateComponent},
        {path: 'list', component: RequirementListComponent}
      ]}
    ]},
    { path: '', redirectTo: '/vacancy', pathMatch: 'full' }, // Default route
  ];
