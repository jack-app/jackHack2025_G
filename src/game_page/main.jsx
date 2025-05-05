import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない

import { GameSetUp, GameResult } from "../messengers";
import GameController from "./gameController";

import StartButton from "./start.png";
import SoundIcon from "./sound-icon.png";
import GuardIcon from "./guard-icon.png";
import './main.css';

class GamePageHandler {
   constructor( gameSetup ) {
      this.gameSetup = gameSetup ?? new GameSetUp();
      this.gameResult = new GameResult();
      this.watingGameEnd = [];
      this.popUpWindowManager = null;
   }

   addGameEndListener( listener ) {
      this.watingGameEnd.push( listener );
   }

   waitForGameEnd() {
      // resolveが呼ばれるまで待機する．resolveはendGameが呼ばれたときに呼ばれる
      return new Promise( ( resolve ) => {
         this.watingGameEnd.push( resolve );
      } );
   }

   endGame() {
      this.watingGameEnd.forEach( ( resolve ) => resolve() );
      this.watingGameEnd = [];
   }
}

function GamePageContentRoot( props ) {
   const windowContainer = <div id="game-main-field"></div>;
   const skillItemContainer = <div class="skill-bar"></div>;

   const content = <div id="game-page-container">
      { windowContainer }
      <footer class='window-bar'>
         <div class="window-bar-item left">
            <img src={ StartButton } />
         </div>
         <div class="window-bar-item center">
            {skillItemContainer}
         </div>
         <div class="window-bar-item right">
            <img class="footer-icon" src={ SoundIcon } />
            <img class="footer-icon" src={ GuardIcon } />
            {/* TODO : display elapse time  */ }
            <div class="time">11:22 AM </div>

         </div>
      </footer>
   </div>;

   // this may occurs conflict!! sorry!!
   const game_controller = new GameController(
      props.handler.gameSetup,
      props.handler.gameResult,
      content,
      windowContainer,
      skillItemContainer,
      () => props.handler.endGame()
   );

   game_controller.start();

   return content;
}

const Game = {
   handler: GamePageHandler,
   content: GamePageContentRoot,
};
export default Game;
