import Answer from "./Answer";
import "./question.css";
import he from "he";

export default function Question(props) {
  let { question } = props;

  let answerElements = question.answers.map((answer) => {
    return (
      <Answer
        key={answer.id}
        data={answer}
        question={question}
        handleSelection={props.handleSelection}
        checkAnswer={props.checkAnswer}
      />
    );
  });

  return (
    <div className="question">
      <p className="question--label">{he.decode(question.question)}</p>
      <div className="question--answers">{answerElements}</div>
    </div>
  );
}
