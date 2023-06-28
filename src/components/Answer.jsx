import "./answer.css";
import he from "he";

export default function Answer(props) {
  function validateAnswer(finished, question, answer) {
    if (!finished) {
      return answer.selected ? "answer selected" : "answer";
    }

    if (!answer.selected) {
      if (answer.id === question.correct_answer.id) {
        return "answer correct";
      }
      return "answer disabled";
    }

    if (answer.id === question.correct_answer.id) {
      return "answer correct";
    }

    if (answer.id !== question.correct_answer.id) {
      return "answer wrong";
    }

    if (answer.id !== question.correct_answer.id) {
      return "answer wrong";
    }
  }

  return (
    <div
      className={validateAnswer(props.checkAnswer, props.question, props.data)}
      onClick={() => props.handleSelection(props.question.id, props.data.id)}
    >
      {he.decode(props.data.label)}
    </div>
  );
}
