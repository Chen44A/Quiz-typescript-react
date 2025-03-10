import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../Redux/quizSlice';
import { RootState } from '../Redux/configureStore';
import { SelectedAnswer } from '../Models/SelectedAnswer';
import { Profession } from '../Models/Profession';

type ResultStatusProps = {
  uppdateResultStatus: (newStatus: boolean) => void;
};

export const Result = ({ uppdateResultStatus }: ResultStatusProps) => {
  const dispatch = useDispatch();
  const selectedAnswers = useSelector(
    (store: RootState) => store.quiz.selectedAnswers
  );
  console.log('🚀 selectedAnswers:', selectedAnswers);

  const handelClickStartOm = () => {
    dispatch(resetQuiz());
    uppdateResultStatus(false);
  };

  const calculateTopProfession = (
    selectedAnswers: SelectedAnswer[]
  ): Profession[] => {
    const professionScores: { name: string; score: number }[] = [];
    const scoreMap: { [key: string]: number } = {};

    selectedAnswers.forEach(({ answer }) => {
      answer.professions.forEach(({ name, score }) => {
        scoreMap[name] = (scoreMap[name] || 0) + score;
      });
    });

    //convert till en object array.
    for (const [name, score] of Object.entries(scoreMap)) {
      professionScores.push({ name, score });
    }

    //sortera selectedAnswer
    professionScores.sort((a, b) => b.score - a.score);

    return professionScores;
  };

  calculateTopProfession(selectedAnswers);

  const topProfessions: Profession[] = calculateTopProfession(selectedAnswers);
  console.log(
    '🌷SorteradeProfessions:',
    JSON.stringify(topProfessions, null, 2)
  );

  return (
    <>
      <h1>Result</h1>
      <h2>Yrken som kan passa dig:</h2>
      <section>
        <ul>
          {topProfessions.slice(0, 3).map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
      </section>
      <button onClick={handelClickStartOm}>Gör om quizet!</button>
    </>
  );
};
