import './index.css';


import Game from './game_page/main.jsx';

import { endGame, GameState, resetPage, startGame } from './state.js';
import StartPage from './start_page/main.jsx';
import ResultPage from './result_page/main.jsx';
import { addListener } from '@reduxjs/toolkit';

class App {
   constructor( rootElement ) {
      this.root = rootElement;
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
   reset() {
      this.root.replaceChildren( StartPage() );
   }
}

const rootElement = document.getElementById( 'root' );
const app = new App( rootElement );

app.showStartPage();
GameState.dispatch( addListener( { type: startGame().type, effect: () => app.runGame() } ) );
GameState.dispatch( addListener( { type: endGame().type, effect: () => app.showResultPage() } ) );
GameState.dispatch( addListener( { type: resetPage().type, effect: () => app.reset() } ) );
