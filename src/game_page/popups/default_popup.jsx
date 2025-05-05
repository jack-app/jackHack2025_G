import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { RandomContent } from './popup_contents';

export default function defaultPopUpFactory({parent, onScoreUp}) {
  return new DefaultPopUp(parent, onScoreUp);
}
class DefaultPopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp) {
    super(parent, 200, 150, onScoreUp);
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

  update() {}
}
