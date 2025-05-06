import { EASY, GameState, HARD, NORMAL } from "../../state";

import defaultPopUpFactory from "./default_popup";
import movingPopUpFactory from "./moving_popup";
import multiPopUpFactory from "./multi_popup";
import rotatingPopUpFactory from "./rotating_popup";
import leanPopUpFactory from "./lean_popup";
import scalingPopUpFactory from "./scaling_popup";
import priorityPopUpFactory from "./priority_popup";

import flickeringPopUpFactory from "./flicker_popup";
import evadePopUpFactory from "./evade_popup";
import { addListener } from "@reduxjs/toolkit";

const popupKinds = [
   priorityPopUpFactory,
   evadePopUpFactory,
   movingPopUpFactory,
   defaultPopUpFactory,
   leanPopUpFactory,
   flickeringPopUpFactory,
   scalingPopUpFactory,
   multiPopUpFactory,
   rotatingPopUpFactory,
   
];


async function sleep( ms ) {
   return new Promise( ( resolve ) => setTimeout( resolve, ms ) );
}

function getPopUpIntervalFromDifficulty( difficulty ) {
   switch ( difficulty ) {
      // in milliseconds
      case EASY:
         return 5000;
      case NORMAL:
         return 3000;
      case HARD:
         return 1000;
      default:
         return 2000;
   }
}

function getInitKindCountFromDifficulty( difficulty ) {
   switch ( difficulty ) {
      case EASY:
         return 2;
      case NORMAL:
         return 3;
      case HARD:
         return 4;
      default:
         return 2;
   }
}

export default class PopUpWindowManager {
   constructor( popUpContainer, framerate, onScoreUp, getTimeSinceGameStart ) {
      this.framerate = framerate;
      this.popUpContainer = popUpContainer;
      this.onScoreUp = onScoreUp;
      this.getTimeSinceGameStart = getTimeSinceGameStart;

      this.windows = [];

      this.lastPopUp = null;

      this.countChangeInterval = 0; // ポップアップ変更回数
      this.popUpInterval = getPopUpIntervalFromDifficulty( GameState.getState().difficulty );
      this.availablePopUps = popupKinds.slice( 0, getInitKindCountFromDifficulty( GameState.getState().difficulty ) );
      GameState.dispatch( addListener( {
         type: 'updateAvailablePopUps', effect: ( action ) => {
            this.availablePopUps = popupKinds.slice( 0, action.payload );
            console.log( "availablePopUps", this.availablePopUps );
         }
      } ) );
   }

   updateAvailablePopUps( number ) {
      console.log( "updateAvailablePopUps", number );
      GameState.dispatch( {
         type: 'updateAvailablePopUps',
         payload: number,
      } );
   }

   checkUpdateKindCount() {
      const _currentDifficulty = GameState.getState().difficulty;
      const currentKindCount = this.availablePopUps.length;
      const maxKindCount = popupKinds.length;
      const _currentScore = GameState.getState().score;
      const currentTime = this.getTimeSinceGameStart();

      var newKindCount = currentKindCount;
      // Update Logic
      {
         if ( currentTime > 10000 * ( currentKindCount + 1 ) ) {
            newKindCount += 1; // ポップアップの種類を1増やす
         }

      }

      // check for overflow
      if ( newKindCount > maxKindCount ) {
         newKindCount = maxKindCount;
      }
      if ( newKindCount != currentKindCount ) this.updateAvailablePopUps( newKindCount );
   }


   get timeSinceLastPopUp() {
      if ( this.lastPopUp ) {
         return Date.now() - this.lastPopUp;
      }
      return null;
   }
   pickRandomPopUp() {
      const availablePopUps = this.availablePopUps;
      return availablePopUps[ Math.floor( Math.random() * availablePopUps.length ) ];
   }

   changeInterval() {
      if ( this.getTimeSinceGameStart() > 2000 * ( this.countChangeInterval + 1 ) ) {
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
         framerate: this.framerate
      };

      if ( this.timeSinceLastPopUp === null ) {
         // ここは最初だけ実行される
         const newWindow = defaultPopUpFactory( popupContext );
         return newWindow;
      }

      if ( this.timeSinceLastPopUp < this.popUpInterval ) return null; // この場合何もしない

      const randomPopup = this.pickRandomPopUp();
      const newWindow = randomPopup( popupContext );

      return newWindow;
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

   updatePerFrame() {
      this.triggerWindowPopup();
      this.changeInterval();
      this.windows.forEach( ( win ) => win.update() );
   }

   clearAllWindows() {
      this.popUpContainer.replaceChildren();
   }
}
