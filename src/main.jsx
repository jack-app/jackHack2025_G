import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import './index.css';

import { GameSetUp } from './messengers.js';
import Start from './start_page/main.jsx';

import Game from './game_page/main.jsx';

import Result from './result_page/main.jsx';
import { GAME_PAGE, GAME_RESULT_PAGE, GameState, START_PAGE } from './state.js';
import StartPage from './start_page/main.jsx';
import ResultPage from './result_page/main.jsx';
import { addListener } from '@reduxjs/toolkit';

class App {
   constructor( rootElement ) {
      this.root = rootElement;
   }

   render() {
      console.log( 'render' );
      switch ( GameState.getState().page ) {
         case START_PAGE:
            this.showStartPage();
            break;
         case GAME_PAGE:
            this.runGame();
            break;
         case GAME_RESULT_PAGE:
            this.showResultPage();
            break;
         default:
            console.error( 'Unknown page state' );
            break;
      }
   }

   showStartPage() {
      this.root.replaceChildren( StartPage() );
   }

   runGame() {
      this.root.replaceChildren( Game() );
   }

   showResultPage() {
      console.log( 'showResultPage' );
      this.root.replaceChildren( ResultPage() );
   }
}

const rootElement = document.getElementById( 'root' );
const app = new App( rootElement );

app.render();
GameState.dispatch( addListener( { type: 'page/startGame', effect: () => app.render() } ) );
GameState.dispatch( addListener( { type: 'page/endGame', effect: () => app.render() } ) );
GameState.dispatch( addListener( { type: 'page/resetPage', effect: () => app.render() } ) );
