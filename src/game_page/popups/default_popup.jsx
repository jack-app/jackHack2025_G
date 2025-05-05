import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';

export default function defaultPopUpFactory({parent, onScoreUp}) {
  return new DefaultPopUp(parent, onScoreUp);
}
class DefaultPopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp) {
    super(parent, defaultWindowWidth, defaultWindowHeight, onScoreUp);
  }

  createWindowDom() {
    return <PopUpWindowDOM // 必ずしもPopUpWindowDOMを使う必要はない
        onClickClose={
            () => {
                this.onScoreUp()
                this.close()
        }}>
        Sample Content
    </PopUpWindowDOM>
  }

  update() {}
}
