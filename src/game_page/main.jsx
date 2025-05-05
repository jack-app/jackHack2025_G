import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない

import { GameSetUp, GameResult } from "../messengers";
import GameController from "./gameController";

import './main.css';

class GamePageHandler {
  constructor(gameSetup) {
      this.gameSetup = gameSetup ?? new GameSetUp();
      this.gameResult = new GameResult();
      this.watingGameEnd = [];
      this.popUpWindowManager = null;
  }

  addGameEndListener(listener) {
      this.watingGameEnd.push(listener);
  }

  waitForGameEnd() {
      // resolveが呼ばれるまで待機する．resolveはendGameが呼ばれたときに呼ばれる
      return new Promise((resolve) => {
          this.watingGameEnd.push(resolve);
      });
  }

  endGame() {
      this.watingGameEnd.forEach((resolve) => resolve());
      this.watingGameEnd = [];
  }
}

function GamePageContentRoot(props) {
  const windowContainer = <div id="game-main-field"></div>

  const game_controller = new GameController(
    props.handler.gameSetup,
    props.handler.gameResult,
    windowContainer,
    () => props.handler.endGame()
  );
  
  const content = <div id="game-page-container">
    {windowContainer}
  </div>;

  game_controller.start()

  return content;
}

const Game = {
  handler: GamePageHandler,
  content: GamePageContentRoot,
}
export default Game;