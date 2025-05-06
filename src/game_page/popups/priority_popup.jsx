import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';
import "./priority_popup.css"

export default function priorityPopUpFactory({parent, onScoreUp, framerate, onClose}) {
  return new PriorityPopUp(parent, onScoreUp, framerate, onClose);
}
class PriorityPopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp, framerate, onClose) {
    super(parent, parent.clientWidth, parent.clientHeight, onScoreUp, onClose, 0, 0);
    this.framerate = framerate
    
  }

  createWindowDom() {
    return <div class="priority-cover">
    <PopUpWindowDOM // 必ずしもPopUpWindowDOMを使う必要はない
        onClickClose={
            () => {
                this.onScoreUp()
                this.onClose( this )
        }}>
        <RandomContent/>
    </PopUpWindowDOM>
    </div>
  }

  update() {
  }
}
