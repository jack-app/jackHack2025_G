import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';

export default function multiPopUpFactory( { parent, onScoreUp, onClose } ) {
   return new MultiPopUp( parent, onScoreUp, onClose );
}
class MultiPopUp extends PopUpWindowBase {
   constructor( parent, onScoreUp, onClose, residure = 4, x = null, y = null ) {
      super( parent, defaultWindowWidth, defaultWindowHeight, onScoreUp, onClose, x, y );
      this.multiPop = true;
      this.intervalInMili = 250; // ms

      this.xShiftAmount = 10;
      this.yShiftAmount = 10;
      this.residure = residure;

      // shift the position
      const right = this.parent.clientWidth - this.x;
      const bottom = this.parent.clientHeight - this.y;
      if ( right < this.xShiftAmount * this.residure ) {
         this.x -= this.width;
      }
      if ( bottom < this.yShiftAmount * this.residure ) {
         this.y -= this.height;
      }
   }

   getSubsequentPopUp() {
      if ( this.residure <= 0 ) return null;
      this.residure -= 1;
      return new MultiPopUp(
         this.parent,
         this.onScoreUp,
         this.onClose,
         this.residure,
         this.x + this.xShiftAmount,
         this.y + this.yShiftAmount
      );
   }

   createWindowDom() {
      return <PopUpWindowDOM // 必ずしもPopUpWindowDOMを使う必要はない
         onClickClose={
            () => {
               this.onScoreUp();
               this.onClose( this );
            } }>
         <RandomContent />
      </PopUpWindowDOM>;
   }

   update() { }
}
