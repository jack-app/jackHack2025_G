import { EASY, endGame, GameState, HARD, incrementScore, NORMAL, resetScore, setTimer } from "../state";
import SkillManager from "./skills/skill_manager";

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
      );

      this.maxWindowCount = getMaxWindowCountFromDifficulty( GameState.getState().difficulty ); // 最大ウィンドウ数
      this.startTime = null;

      this.skillManager = new SkillManager( gameContainer, skillItemContainer, this.popUpManager );
   }

   get timeSinceGameStart() {
      return Date.now() - this.startTime;
   }

   onScoreUp() {
      GameState.dispatch( incrementScore() );
      this.skillManager.triggerSkillInsertion( GameState.getState().user.score );
   }

   judgeEnd() {
      return this.popUpManager.windows.length > this.maxWindowCount;
   }

   start() {
      this.startTime = Date.now();
      GameState.dispatch( resetScore() );
      this.frameInterval = setInterval( () => {
         GameState.dispatch( setTimer( this.timeSinceGameStart ) ); // update the timer in the state`
         this.popUpManager.checkUpdateKindCount();
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
