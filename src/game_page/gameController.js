import { addPopUp, EASY, endGame, GameState, HARD, incrementScore, NORMAL, resetWindows, setTimer } from "../state";
import Game from "./main";
import defaultPopUpFactory from "./popups/default_popup";
import movingPopUpFactory from "./popups/moving_popup";
import multiPopUpFactory from "./popups/multi_popup";
import SkillManager from "./skills/skill_manager";
import rotatingPopUpFactory from "./popups/rotating_popup";
import leanPopUpFactory from "./popups/lean_popup";
import scalingPopUpFactory from "./popups/scaling_popup";
import priorityPopUpFactory from "./popups/priority_popup";

import flickeringPopUpFactory from "./popups/flicker_popup";
import evadePopUpFactory from "./popups/evade_popup";

const popupKinds = [
    defaultPopUpFactory,
    movingPopUpFactory,
    multiPopUpFactory,
   flickeringPopUpFactory,
   evadePopUpFactory,
    rotatingPopUpFactory,
    leanPopUpFactory,
    scalingPopUpFactory,
    priorityPopUpFactory,
]

function pickRandomPopUp() {
   return popupKinds[ Math.floor( Math.random() * popupKinds.length ) ];
}

async function sleep( ms ) {
   return new Promise( ( resolve ) => setTimeout( resolve, ms ) );
}

function getMaxWindowCountFromDifficulty( difficulty ) {
   switch ( difficulty ) {
      case EASY:
         return 30;
      case NORMAL:
         return 40;
      case HARD:
         return 50;
      default:
         return 30;
   }
}

function getPopUpIntervalFromDifficulty( difficulty ) {
   switch ( difficulty ) {
      // in milliseconds
      case EASY:
         return 3000;
      case NORMAL:
         return 2000;
      case HARD:
         return 1000;
      default:
         return 2000;
   }
}

export default class GameController {
   constructor(
      gameContainer,
      popupContainer,
      skillItemContainer,
   ) {
      // popup windows
      this.windows = [];
      this.frameInterval = null; // store the setInterval ID
      this.framerate = 40; // FPS
      this.maxWindowCount = getMaxWindowCountFromDifficulty( GameState.getState().difficulty ); // 最大ウィンドウ数
      this.popUpContainer = popupContainer;
      this.lastPopUp = null;
      this.startTime = null;
      this.countChangeInterval = 0; // ポップアップ変更回数
      this.popUpInterval = getPopUpIntervalFromDifficulty( GameState.getState().difficulty );

      this.skillManager = new SkillManager( gameContainer, skillItemContainer );
   }

   get timeSinceLastPopUp() {
      if ( this.lastPopUp ) {
         return Date.now() - this.lastPopUp;
      }
      return null;
   }

   get timeSinceGameStart() {
      return Date.now() - this.startTime;
   }

   onScoreUp() {
      GameState.dispatch( incrementScore() );
   }

   changeInterval() {
      if ( this.timeSinceGameStart > 1000 * ( this.countChangeInterval + 1 ) ) {
         // 1秒経過ごとにポップアップの間隔を短くする
         this.popUpInterval = Math.max( 500, this.popUpInterval - 50 ); // 0.5秒未満にはならない　0.05秒づつ速くなる
         this.countChangeInterval += 1; // ポップアップ間隔変更回数を1増やす
      }
   }

   getWindowToPopUp() {
      const popupContext = { // to give all of information PopUpWindow needs
         onScoreUp: this.onScoreUp,
         onClose: ( win ) => {
            this.popUpContainer.removeChild( win.dom );
            this.windows = this.windows.filter( ( w ) => w.id != win.id );
         },
         parent: this.popUpContainer,
      };

      if ( this.timeSinceLastPopUp === null ) {
         // ここは最初だけ実行される
         const newWindow = defaultPopUpFactory( popupContext );
         return newWindow;
      }

      if ( this.timeSinceLastPopUp < this.popUpInterval ) return null; // この場合何もしない

      const randomPopup = pickRandomPopUp();
      const newWindow = randomPopup( popupContext );

      return newWindow; // return an array of windows
   }

   // This is bug-ish
   async insertWindowsSequently( first ) {
      let newWindow = first;
      while ( newWindow !== null ) {
         if ( newWindow ) {
            this.popUpContainer.appendChild( newWindow.dom );
            this.windows.push( newWindow );
         }
         newWindow = newWindow.getSubsequentPopUp();
         if ( newWindow ) await sleep( newWindow.intervalInMili );
      }
   }

   insertWindow( newWindow ) {
      if ( newWindow.multiPop ) {
         // multiPopがtrueのときは一定間隔で複数のウィンドウを出現させる
         this.insertWindowsSequently( newWindow );
      } else {
         this.popUpContainer.appendChild( newWindow.dom );
         this.windows.push( newWindow );
      }
   }

   triggerWindowPopup() {
      const newWindow = this.getWindowToPopUp();
      if ( newWindow !== null ) {
         this.insertWindow( newWindow );
         this.lastPopUp = Date.now();
      }
   }

   judgeEnd( windows ) {
      // return windows.length > this.maxWindowCount;
   }

   start() {
      this.startTime = Date.now();
      this.frameInterval = setInterval( () => {
         GameState.dispatch( setTimer( this.timeSinceGameStart ) ); // update the timer in the state`
         this.triggerWindowPopup();
         this.changeInterval();
         this.windows.forEach( ( win ) => win.update() );
         if ( this.judgeEnd( this.windows ) ) {
            console.log( "Game Over" );
            this.stop();
         }
      }, 1000 / this.framerate ); // this.framerate FPSのループを回す
   }

   stop() {
      if ( this.frameInterval ) {
         clearInterval( this.frameInterval ); // frameループを止める
         this.frameInterval = null;
      }

      // Clean up windows
      this.popUpContainer.replaceChildren();
      this.windows = [];
      GameState.dispatch( endGame() );
   }
}
