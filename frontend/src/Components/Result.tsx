import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../Redux/quizSlice';
import { RootState } from '../Redux/configureStore';

type ResultStatusProps = {
  uppdateResultStatus: (newStatus: boolean) => void;
};

export const Result = ({ uppdateResultStatus }: ResultStatusProps) => {
  const dispatch = useDispatch();
  const selectedAnswers = useSelector((store: RootState) => store.quiz);
  console.log('selectedAnswers:', selectedAnswers);

  const handelClick = () => {
    dispatch(resetQuiz());
    uppdateResultStatus(false);
  };

  return (
    <>
      <h1>Result</h1>
      <section></section>
      <button onClick={handelClick}>Gör om quizet!</button>
    </>
  );
};
