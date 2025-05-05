import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない

import { GameSetUp, GameResult } from "../messengers";
import GameController from "./gameController";

import StartButton from "./start.png";
import SoundIcon from "./sound-icon.png";
import GuardIcon from "./guard-icon.png";
import './main.css';
import { GameState } from '../state';
import { addListener } from '@reduxjs/toolkit';

function updateTimer( elapsed ) {
   const min = Math.floor( elapsed / 60000 );
   const sec = Math.floor( ( elapsed % 60000 ) / 1000 );
   const msec = Math.floor( ( elapsed % 1000 ) / 10 );
   `${ min < 10 ? "0" : "" }${ min }:${ sec < 10 ? "0" : "" }${ sec }:${ msec < 10 ? "0" : "" }${ msec }`;
}

function GamePage() {
   const windowContainer = <div id="game-main-field"></div>;
   const skillItemContainer = <div class="skill-bar"></div>;


   GameState.dispatch( addListener( {
      type: "windows/addPopUp", effect: ( action ) => {
         windowContainer.appendChild( action.payload.dom );
      }
   } ) );


   const content = <div id="game-page-container">
      { windowContainer }
      <footer class='window-bar'>
         <div class="window-bar-item left">
            <img src={ StartButton } />
         </div>
         <div class="window-bar-item center">
            { skillItemContainer }
         </div>
         <div class="window-bar-item right">
            <img class="footer-icon" src={ SoundIcon } />
            <img class="footer-icon" src={ GuardIcon } />
            {/* TODO : display elapse time  */ }
            <div class="time">{ updateTimer( GameState.getState().timer ) } </div>

         </div>
      </footer>
   </div>;

   // this may occurs conflict!! sorry!!
   const game_controller = new GameController(
      content,
      windowContainer,
      skillItemContainer,
   );

   game_controller.start();

   return content;
}

export default GamePage;
