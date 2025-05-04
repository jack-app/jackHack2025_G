import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "../popup_window_base";

export default class DefaultPopUp extends PopUpWindowBase {
  constructor(x, y, onScoreUp) {
    super(x, y, onScoreUp);
  }

  createWindowDom() {
    return <PopUpWindowDOM 
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
