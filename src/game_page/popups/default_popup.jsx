import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';

export default function defaultPopUpFactory( { parent, onScoreUp, onClose } ) {
   return new DefaultPopUp( parent, onScoreUp, onClose );
}
class DefaultPopUp extends PopUpWindowBase {
   constructor( parent, onScoreUp, onClose ) {
      super( parent, defaultWindowWidth, defaultWindowHeight, onScoreUp, onClose );
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
