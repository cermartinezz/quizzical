import "./answer.css";
import he from "he";

export default function Answer(props) {
  return (
    <div
      className={
        props.question.selected_answer == props.data.id
          ? "answer selected"
          : "answer"
      }
      onClick={() => props.handleSelection(props.question.id, props.data.id)}
    >
      {he.decode(props.data.label)}
    </div>
  );
}
