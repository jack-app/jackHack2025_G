import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';

export default function scalingPopUpFactory({parent, onScoreUp, framerate, onClose}) {
  return new ScalingPopUp(parent, onScoreUp, framerate, onClose);
}
class ScalingPopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp, framerate, onClose) {
    super(parent, defaultWindowWidth, defaultWindowHeight, onScoreUp, onClose);
    this.framerate = framerate
    this.scale_degnumber = 0;
  }

  createWindowDom() {
    return <PopUpWindowDOM // 必ずしもPopUpWindowDOMを使う必要はない
        onClickClose={
            () => {
                this.onScoreUp()
                this.onClose( this )
        }}>
        <RandomContent/>
    </PopUpWindowDOM>
  }

  update() {
      this.scale_degnumber += 0.05;
      this.scalenumber = Math.sin(this.scale_degnumber)/2 + 1;
      this.dom.style.transform = `scale(${this.scalenumber})`;
  }
}
