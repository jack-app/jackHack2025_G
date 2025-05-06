import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';

export default function leanPopUpFactory({parent, onScoreUp, framerate, onClose}) {
  return new LeanPopUp(parent, onScoreUp, framerate, onClose);
}
class LeanPopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp, framerate, onClose) {
    super(parent, defaultWindowWidth, defaultWindowHeight, onScoreUp, onClose);
    this.framerate = framerate
    this.leannumber = Math.random() * 360;
  }

  createWindowDom() {
    return <PopUpWindowDOM // 必ずしもPopUpWindowDOMを使う必要はない
        onClickClose={
            () => {
                this.onScoreUp();
                this.onClose( this );
        }}>
        <RandomContent/>
    </PopUpWindowDOM>
  }

  update() {
      this.dom.style.transform = `rotate(${this.leannumber}deg)`;
  }
}
