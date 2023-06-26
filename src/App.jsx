import { useState } from "react";
import Init from "./components/Init";
import Game from "./components/Game";

function App() {
  const [playing, setPlaying] = useState(false);

  function initGame() {
    setPlaying((prevPlaying) => !prevPlaying);
  }

  return (
    <div className="container">
      {playing ? (
        <Game handleInitGame={initGame} />
      ) : (
        <Init handleInitGame={initGame} />
      )}
    </div>
  );
}

export default App;
