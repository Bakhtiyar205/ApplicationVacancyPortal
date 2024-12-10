import { PersonListComponent } from "./person-list/person-list.component";
import { AdminVacancyListComponent } from "./admin-vacancy-list/admin-vacancy-list.component";
import { AdminRequirementListComponent } from "./admin-requirement-list/admin-requirement-list.component";
import { AdminQuestionListComponent } from "./admin-question-list/admin-question-list.component";
import { AdminQuestionOptionListComponent } from "./admin-question-option-list/admin-question-option-list.component";

export const Sections = 
[
    {
        id: 1,
        name: 'People',
        Component: PersonListComponent
    },
    {
        id: 2,
        name: 'Vacancies',
        Component: AdminVacancyListComponent
    },
    {
        id: 3,
        name: 'Exam Requirement',
        Component: AdminRequirementListComponent
    },
    {
        id: 4,
        name: 'Questions',
        Component: AdminQuestionListComponent
    },
    { 
        id: 5,
        name: 'Question Options',
        Component: AdminQuestionOptionListComponent
    }
];
