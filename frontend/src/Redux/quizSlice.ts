import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../Models/Question';
import { SelectedAnswer } from '../Models/SelectedAnswer';
import { Profession } from '../Models/Profession';
import { AnswerOption } from '../Models/AnswerOption';

export interface QuizState {
  questions: Question[];
  currentIndexOfQuestion: number;
  selectedAnswers: SelectedAnswer[];
}

const questions: Question[] = [
  {
    id: 1,
    questionText: '1. What type of work environment do you prefer?',
    answerOptions: [
      {
        text: 'Working with technology and machinery.',
        professions: [
          { name: 'Automation Electrician', score: 1 } as Profession,
          { name: 'Industrial Electrician', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,
      {
        text: 'Leading teams and managing projects.',
        professions: [
          { name: 'Project Manager', score: 1 } as Profession,
          { name: 'Supervisor', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,
      {
        text: 'Designing and constructing electrical systems.',
        professions: [
          { name: 'Electrical Designer', score: 1 } as Profession,
          { name: 'Construction Electrician', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,
      {
        text: 'Sales and communication with clients.',
        professions: [
          { name: 'Technical Sales', score: 1 } as Profession,
          { name: 'Project Sales', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,
    ] as Array<AnswerOption>,
  } as Question,
  {
    id: 2,
    questionText: '2. What motivates you the most in a job?',
    answerOptions: [
      {
        text: 'Practical and hands-on work.',
        professions: [
          { name: 'Service Electrician', score: 1 } as Profession,
          { name: 'Installation Electrician', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,
      {
        text: 'Opportunities to innovate and create.',
        professions: [
          { name: 'Entrepreneur', score: 1 } as Profession,
          { name: 'Solar Installer', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,
      {
        text: 'Solving complex technical problems.',
        professions: [
          { name: 'Alarm/Security Technician', score: 1 } as Profession,
          { name: 'Elevator Technician', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,

      {
        text: 'Teaching and sharing knowledge.',
        professions: [
          { name: 'Vocational Teacher', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,
    ] as Array<AnswerOption>,
  } as Question,
  {
    id: 3,
    questionText: '3. How do you handle responsibility?',
    answerOptions: [
      {
        text: 'Taking the lead and making decisions.',
        professions: [
          { name: 'CEO', score: 1 } as Profession,
          { name: 'Division Manager', score: 1 } as Profession,
        ],
      } as AnswerOption,
      {
        text: 'Managing financial aspects of projects.',
        professions: [
          { name: 'Estimator', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,
      {
        text: 'Ensuring safety and compliance.',
        professions: [
          { name: 'Alarm/Security Technician', score: 1 } as Profession,
          { name: 'Project Manager', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,

      {
        text: 'Working independently and managing my own business.',
        professions: [
          { name: 'Entrepreneur', score: 1 } as Profession,
        ] as Profession[],
      } as AnswerOption,
    ] as Array<AnswerOption>,
  } as Question,
];

const initialState: QuizState = {
  questions: questions,
  currentIndexOfQuestion: 0,
  selectedAnswers: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    nextQuestion: (state) => {
      if (state.currentIndexOfQuestion < state.questions.length - 1) {
        state.currentIndexOfQuestion += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentIndexOfQuestion > 0) {
        state.currentIndexOfQuestion -= 1;
      }
    },
    selectAnswer: (state, action: PayloadAction<SelectedAnswer>) => {
      const { id, answer } = action.payload;
      //Set the function to change the answer
      state.selectedAnswers = state.selectedAnswers.map((selected) =>
        selected.id === id ? { ...selected, answer } : selected
      );
      if (!state.selectedAnswers.some((selected) => selected.id === id)) {
        state.selectedAnswers.push(action.payload);
      }
      console.log('Action:', action.payload);
    },
    resetQuiz: (state) => {
      state.selectedAnswers = [];
      state.currentIndexOfQuestion = 0;
    },
  },
});

export const { nextQuestion, previousQuestion, selectAnswer, resetQuiz } =
  quizSlice.actions;

export default quizSlice.reducer;
