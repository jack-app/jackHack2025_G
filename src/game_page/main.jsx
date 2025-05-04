import { useEffect, useRef } from "react";
import { GameController } from "../game-vanilla/GameController";
import './main.css';

function GamePage(props) {
  const managerRef = useRef(null);
  useEffect(() => {
    // Initialize and start the window manager with initial frame rates
    managerRef.current = new GameController({
      createFrameRate: 2000,
      updateFrameRate: 50,
      elementId: "game-window",
    });
    managerRef.current.start();

    return () => {
      // Cleanup when component unmounts
      if (managerRef.current) {
        managerRef.current.stop();
      }
    };
  }, []);

  return (
    <>
      <div id="game-page-container">
      <div id="game-window"></div>
      <button onClick={() => props.handler.endGame()}>End Game</button>
      </div>
    </>
  );
}
export default GamePage;
