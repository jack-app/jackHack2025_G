import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';

export default function priorityPopUpFactory({parent, onScoreUp, framerate}) {
  return new PriorityPopUp(parent, onScoreUp, framerate);
}
class PriorityPopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp, framerate) {
    super(parent, defaultWindowWidth, defaultWindowHeight, onScoreUp);
    this.framerate = framerate
  }

  createWindowDom() {
    return <PopUpWindowDOM // 必ずしもPopUpWindowDOMを使う必要はない
        onClickClose={
            () => {
                this.onScoreUp()
                this.close()
        }}>
        <RandomContent/>
    </PopUpWindowDOM>
  }

  update() {
  }
}
