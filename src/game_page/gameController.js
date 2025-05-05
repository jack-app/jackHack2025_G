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

export default class GameController {
   // コンフリクトしたらごめん！！！！
   constructor(
      gameSetUp,
      gameResult,
      gameContainer,
      popupContainer,
      skillItemContainer,
      elapseTime,
      gameEndCallback
   ) {
      // messengers
      this.gameSetUp = gameSetUp;
      this.gameResult = gameResult;

      // popup windows
      this.windows = [];
      this.frameInterval = null;
      this.framerate = 40; // FPS
      this.popUpContainer = popupContainer;
      this.lastPopUpTrigger = null;
      this.timer = 0; // ポップアップタイマー
      this.gametimer = 0; // ゲームタイマー
      this.countChangeInterval = 0; // ポップアップ変更回数
      this.popUpInterval = gameSetUp.initialPopupInterval ?? 1000; // ポップアップの間隔

      // game over
      this.gameEndCallback = gameEndCallback;

      this.skillManager = new SkillManager( gameContainer, skillItemContainer );
      this.elapseTime = elapseTime;
   }

   onScoreUp() {
      this.gameResult.score += 1;
   }

   changeInterval( elapsed ) {
      this.gametimer += elapsed;
      if ( this.gametimer > 1000 * ( this.countChangeInterval + 1 ) ) {
         // 1秒経過ごとにポップアップの間隔を短くする
         this.popUpInterval = Math.max( 500, this.popUpInterval - 50 ); // 0.5秒未満にはならない　0.05秒づつ速くなる
         this.countChangeInterval += 1; // ポップアップ間隔変更回数を1増やす
      }
   }

   getWindowToPopUp( elapsed ) { // elapsed.. タイマーの増分
      const popupContext = { // to give all of information PopUpWindow needs
         onScoreUp: () => this.onScoreUp(),
         parent: this.popUpContainer,
         framerate: this.framerate,
      };

      if ( elapsed === null ) {
         // ここは最初だけ実行される
         const newWindow = defaultPopUpFactory( popupContext );
         return newWindow;
      }

      this.gametimer += elapsed;
      for ( let i = 1; i < 15; i++ ) {
         if ( this.gametimer > i * 1000 ) {
            // 10秒経過したらポップアップの間隔を短くする
            this.popUpInterval = Math.max( 500, this.popUpInterval - 200 ); // 1秒未満にはならない
         }
      }
      this.timer += elapsed;
      // popupの出現間隔は動的に変更可
      // dynamic interval gives more choice, right?
      // Poping up can be faster as the game goes on
      if ( this.timer < this.popUpInterval ) return null; // この場合何もしない

      const randomPopup = pickRandomPopUp();
      const newWindow = randomPopup( popupContext );

      this.timer = 0; // reset the timer
      return newWindow; // return an array of windows
   }

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
      let elapsed = null;
      if ( this.lastPopUpTrigger ) {
         elapsed = Date.now() - this.lastPopUpTrigger; // in milliseconds
      }

      const newWindow = this.getWindowToPopUp( elapsed );
      if ( newWindow !== null ) {
         this.insertWindow( newWindow );
      }

      this.lastPopUpTrigger = Date.now();
   }

   cleanUp() {
      // this is needed to judge the number of windows corrently
      this.windows = this.windows.filter( ( win ) => !win.disappeared );
   }

   judgeEnd() {
      return this.windows.length > this.gameSetUp.maxWindowCount;
   }

   updateTimer( elapsed ) {
      const min = Math.floor( elapsed / 60000 );
      const sec = Math.floor( ( elapsed % 60000 ) / 1000 );
      const msec = Math.floor( ( elapsed % 1000 ) / 10 );
      this.elapseTime.innerText = `${ min < 10 ? "0" : "" }${ min }:${ sec < 10 ? "0" : "" }${ sec }:${ msec < 10 ? "0" : "" }${ msec }`;
   }

   start() {
      this.startTime = Date.now();
      this.frameInterval = setInterval( () => {
         const elapsed = Date.now() - this.startTime;
         this.updateTimer( elapsed );
         this.triggerWindowPopup();
         this.windows.forEach( ( win ) => win.update() );
         this.cleanUp();
         if ( this.judgeEnd() ) {
            this.stop();
            this.gameEndCallback();
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
   }
}
