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
import PopUpWindowManager from "./popups/popUpWindowManager";

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

      this.popUpManager = new PopUpWindowManager(
        popupContainer, 
        this.framerate, 
        () => this.onScoreUp(),
        () => this.timeSinceGameStart,
      )

      this.maxWindowCount = getMaxWindowCountFromDifficulty( GameState.getState().difficulty ); // 最大ウィンドウ数      
      this.startTime = null;

      this.skillManager = new SkillManager( gameContainer, skillItemContainer );
   }

   get timeSinceGameStart() {
      return Date.now() - this.startTime;
   }

   onScoreUp() {
      GameState.dispatch( incrementScore() );
   }

   judgeEnd() {
      return this.popUpManager.windows.length > this.maxWindowCount;
   }

   start() {
      this.startTime = Date.now();
      this.frameInterval = setInterval( () => {
         GameState.dispatch( setTimer( this.timeSinceGameStart ) ); // update the timer in the state`
         this.popUpManager.updatePerFrame();
         if ( this.judgeEnd() ) {
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
      this.popUpManager.clearAllWindows();
      GameState.dispatch( endGame() );
   }
}
