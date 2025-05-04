import { useEffect, useRef, useState } from "react";
import { PopUpWindowManager } from "./popup_window_manager";

function GamePage(props) {
  const managerRef = useRef(null);
  useEffect(() => {
    // Initialize and start the window manager with initial frame rates
    managerRef.current = new PopUpWindowManager({
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
      <h1>GamePage</h1>
      <div id="game-window" />
      <button onClick={() => props.handler.endGame()}>End Game</button>
    </>
  );
}
export default GamePage;
