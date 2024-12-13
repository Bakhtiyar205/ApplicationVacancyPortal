export interface Person{
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    cvPath: string;
    correctAnswers: number;
    totalAnswers: number;
    personVacancies: PersonVacancy[];
}

export interface PersonVacancy{
    id: number;
    vacancyId: number;
    vacancyName: string;
}