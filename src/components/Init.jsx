import "./init.css";

export default function Init(props) {
  return (
    <div className="init">
      <h1 className="init--title">Quizzical</h1>
      <button className="init--start" onClick={props.handleInitGame}>
        Start Quiz
      </button>
    </div>
  );
}
