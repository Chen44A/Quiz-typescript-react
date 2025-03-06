import { AnswerOption } from './AnswerOption';

export interface Question {
  questionText: string;
  id: number;
  answerOptions: AnswerOption[];
}
