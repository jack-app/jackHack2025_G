import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない

import { GameSetUp, GameResult } from "../messengers";
import PopUpWindowFactory from './popup_window_factory';
import PopUpWindowManager from "./popup_window_manager";

import './main.css';

export class GamePageHandler {
  constructor(gameSetup) {
      this.gameSetup = gameSetup ?? new GameSetUp();
      this.gameResult = new GameResult();
      this.watingGameEnd = [];
      this.popUpWindowManager = null;
  }

  bindPopUpWindowManagerTo(element) {
    const factory = new PopUpWindowFactory(this.gameSetup);
    this.popUpWindowManager = new PopUpWindowManager(element, factory);
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

function GamePageContentRoot(props) { // すっかすか！
  const windowContainer = <div id="game-main-field"></div>
  props.handler.bindPopUpWindowManagerTo(windowContainer);
  return <div id="game-page-container">
    {windowContainer}
  </div>;
}

const Game = {
  handler: GamePageHandler,
  content: GamePageContentRoot,
}
export default Game;