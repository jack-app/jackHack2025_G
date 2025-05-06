import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';

export default function rotatingPopUpFactory({parent, onScoreUp, framerate}) {
  return new RotatingPopUp(parent, onScoreUp, framerate);
}
class RotatingPopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp, framerate) {
    super(parent, defaultWindowWidth, defaultWindowHeight, onScoreUp);
    this.framerate = framerate
    this.rotatenumber = Math.random() * 360;
    this.rotatespeed = Math.random() * 3;
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
      
      this.rotatenumber += this.rotatespeed;
      this.dom.style.transform = `rotate(${this.rotatenumber}deg)`;
  }
}
