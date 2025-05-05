import { addPopUp, EASY, endGame, GameState, HARD, incrementScore, NORMAL, resetWindows, setTimer } from "../state";
import Game from "./main";
import defaultPopUpFactory from "./popups/default_popup";
import movingPopUpFactory from "./popups/moving_popup";
import multiPopUpFactory from "./popups/multi_popup";
import SkillManager from "./skills/skill_manager";

const popupKinds = [
   defaultPopUpFactory,
   movingPopUpFactory,
   multiPopUpFactory,
];

function pickRandomPopUp() {
   return popupKinds[ Math.floor( Math.random() * popupKinds.length ) ];
}

async function sleep( ms ) {
   return new Promise( ( resolve ) => setTimeout( resolve, ms ) );
}

function getPopUpIntervalFromDifficulty( difficulty ) {
   switch ( difficulty ) {
      case EASY:
         return 2000; // 2秒
      case NORMAL:
         return 1500; // 1.5秒
      case HARD:
         return 1000; // 1秒
      default:
         return 2000; // 2秒
   }
}

export default class GameController {
   // コンフリクトしたらごめん！！！！
   constructor(
      gameContainer,
      popupContainer,
      skillItemContainer,
   ) {

      // popup windows
      this.windows = [];
      this.frameInterval = null; // store the setInterval ID
      this.framerate = 40; // FPS
      this.maxWindowCount = 10; // 最大ウィンドウ数
      this.popUpContainer = popupContainer;
      this.lastPopUpTrigger = null;
      this.timer = 0; // ポップアップタイマー
      this.gametimer = 0; // ゲームタイマー
      this.countChangeInterval = 0; // ポップアップ変更回数
      this.popUpInterval = getPopUpIntervalFromDifficulty( GameState.getState().difficulty );

      this.skillManager = new SkillManager( gameContainer, skillItemContainer );
   }

   onScoreUp() {
      GameState.dispatch( incrementScore() );
   }

   // changeInterval( elapsed ) {
   //    this.gametimer += elapsed;
   //    if ( this.gametimer > 1000 * ( this.countChangeInterval + 1 ) ) {
   //       // 1秒経過ごとにポップアップの間隔を短くする
   //       this.popUpInterval = Math.max( 500, this.popUpInterval - 50 ); // 0.5秒未満にはならない　0.05秒づつ速くなる
   //       this.countChangeInterval += 1; // ポップアップ間隔変更回数を1増やす
   //    }
   // }

   getWindowToPopUp( timeSinceLastPopUp ) { // elapsed.. タイマーの増分
      const popupContext = { // to give all of information PopUpWindow needs
         onScoreUp: this.onScoreUp,
         onClose: ( win ) => {
            this.popUpContainer.removeChild( win.dom );
            this.windows = this.windows.filter( ( w ) => w.id != win.id );
         },
         parent: this.popUpContainer,
      };

      if ( timeSinceLastPopUp === null ) {
         // ここは最初だけ実行される
         const newWindow = defaultPopUpFactory( popupContext );
         return newWindow;
      }

      this.gametimer += timeSinceLastPopUp;
      // for ( let i = 1; i < 15; i++ ) {
      //    if ( this.gametimer > i * 1000 ) {
      //       // 10秒経過したらポップアップの間隔を短くする
      //       this.popUpInterval = Math.max( 500, this.popUpInterval - 200 ); // 1秒未満にはならない
      //    }
      // }
      this.timer += timeSinceLastPopUp;
      // popupの出現間隔は動的に変更可
      // dynamic interval gives more choice, right?
      // Poping up can be faster as the game goes on
      if ( this.timer < this.popUpInterval ) return null; // この場合何もしない

      const randomPopup = pickRandomPopUp();
      const newWindow = randomPopup( popupContext );

      this.timer = 0; // reset the timer
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
      let timeSinceLastPopUp = null;
      if ( this.lastPopUpTrigger ) {
         timeSinceLastPopUp = Date.now() - this.lastPopUpTrigger; // in milliseconds
      }

      const newWindow = this.getWindowToPopUp( timeSinceLastPopUp );
      if ( newWindow !== null ) {
         this.insertWindow( newWindow );
         this.lastPopUpTrigger = Date.now();
      }
   }

   judgeEnd( windows ) {
      return windows.length > this.maxWindowCount;
   }

   start() {
      this.startTime = Date.now();
      this.frameInterval = setInterval( () => {
         const elapsed = Date.now() - this.startTime;
         GameState.dispatch( setTimer( elapsed ) ); // update the timer in the state`
         this.triggerWindowPopup();
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
