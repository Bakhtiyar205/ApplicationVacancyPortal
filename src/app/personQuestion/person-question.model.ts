export interface PersonQuestion{
    id: number;
    questionId: number;
    question: QuestionForPersonQuestion;
}

export interface QuestionForPersonQuestion{
    questionDetail: string;
    questionOptions: OptionForPersonQuestion[];
}

export interface OptionForPersonQuestion{
    option: string;
    isAnswer: boolean;
    id: number;
}