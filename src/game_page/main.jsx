import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない

import { PopUpWindowManager } from "./popup_window_manager";
import './main.css';

function GamePage(props) {
  return <div id="game-page-container">
    <div id="game-window"></div>
    <button onClick={() => props.handler.endGame()}>End Game</button>
  </div>;
}
export default GamePage;
