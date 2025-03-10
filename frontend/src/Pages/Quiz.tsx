import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar } from '../Components/ProgressBar';
import styles from './Quiz.module.scss';
import { RootState } from '../Redux/configureStore';
import {
  nextQuestion,
  previousQuestion,
  selectAnswer,
} from '../Redux/quizSlice';
import { Result } from '../Components/Result';
import { useState } from 'react';
import { AnswerOption } from '../Models/AnswerOption';

export const Quiz = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { questions, currentIndexOfQuestion, selectedAnswers } = useSelector(
    (store: RootState) => store.quiz
  );
  const currentQuestion = questions[currentIndexOfQuestion];
  // console.log('🌸 currentQuestion: ', currentQuestion);
  console.log('🎯 selectedAnswers: ', selectedAnswers);

  const isLast = currentIndexOfQuestion === questions.length - 1;

  const handleOptionChange = (
    questionId: number,
    answerOption: AnswerOption
  ) => {
    setMessage('');
    dispatch(
      selectAnswer({
        questionId,
        answer: answerOption,
      })
    );
  };

  const handlePreviousQuestion = () => {
    dispatch(previousQuestion());
  };

  const handleNextQuestion = () => {
    const isAnswered = selectedAnswers.some(
      (selected) => selected.questionId === currentQuestion.id
    );
    if (isAnswered) {
      dispatch(nextQuestion());
      setMessage('');
    } else {
      setMessage('Välj ett svarsalternativ för att gå vidare.');
    }
  };

  const handleShowResult = () => {
    const isAnswered = selectedAnswers.some(
      (selected) => selected.questionId === currentQuestion.id
    );

    if (isAnswered) {
      setShowResult(true);
    } else {
      setMessage('Du måste slutföra alla frågor innan resultatet visas.');
    }
  };

  const uppdateResultStatus = (newStatus: boolean): void => {
    setShowResult(newStatus);
  };

  return (
    <>
      {showResult ? (
        <Result uppdateResultStatus={uppdateResultStatus} />
      ) : (
        <section>
          <ProgressBar />
          <div>
            <h4>{currentQuestion.questionText}</h4>
            {currentQuestion.answerOptions.map((opt, i) => (
              <div key={i}>
                <input
                  type='radio'
                  id={`option-${currentQuestion.id}-${i}`}
                  name={`question-${currentQuestion.id}`}
                  value={opt.text}
                  checked={selectedAnswers?.some(
                    (selected) =>
                      selected.questionId === currentQuestion.id &&
                      selected.answer.text === opt.text
                  )}
                  onChange={() => handleOptionChange(currentQuestion.id, opt)}
                />
                <label htmlFor={`option-${currentQuestion.id}-${i}`}>
                  {opt.text}
                </label>
              </div>
            ))}
          </div>
          <div>
            <button
              className={styles.previousBtn}
              onClick={handlePreviousQuestion}
              disabled={currentIndexOfQuestion === 0}
            >
              Föregående
            </button>

            {isLast ? (
              <button className={styles.nextBtn} onClick={handleShowResult}>
                Visa resultat
              </button>
            ) : (
              <button
                className={styles.nextBtn}
                onClick={handleNextQuestion}
                disabled={currentIndexOfQuestion === questions.length - 1}
              >
                Nästa
              </button>
            )}
          </div>
          <div className='mt-3'>
            <p>{message}</p>
          </div>
        </section>
      )}
    </>
  );
};
