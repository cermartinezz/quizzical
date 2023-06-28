import "./init.css";

export default function Init(props) {
  return (
    <div className="init">
      <h1 className="init--title">Quizzical</h1>
      <button className="btn" onClick={props.handleInitGame}>
        Start Quiz
      </button>
    </div>
  );
}
