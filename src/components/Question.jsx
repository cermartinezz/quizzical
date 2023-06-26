import Answer from "./Answer";
import "./question.css";

export default function Question(props) {
  let { question } = props;

  let answerElements = question.all_answers.map((answer) => {
    return <Answer key={answer.id} label={answer.label} />;
  });

  return (
    <div className="question">
      <p className="question--label">{question.question}</p>
      <div className="question--answers">{answerElements}</div>
    </div>
  );
}
