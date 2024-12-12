export interface Person{
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    cvPath: string;
    personVacancies: PersonVacancy[];
}

export interface PersonVacancy{
    id: number;
    vacancyId: number;
    vacancyName: string;
}