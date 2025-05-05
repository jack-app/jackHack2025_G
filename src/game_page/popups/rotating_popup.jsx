import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';

export default function defaultPopUpFactory( { parent, onScoreUp, framerate } ) {
   return new DefaultPopUp( parent, onScoreUp, framerate );
}
class DefaultPopUp extends PopUpWindowBase {
   constructor( parent, onScoreUp, onClose, framerate ) {
      super( parent, defaultWindowWidth, defaultWindowHeight, onScoreUp, onClose );
      this.framerate = framerate;
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

   update() {
      this.dom.style.transform = `rotate(45)`;
   }
}
