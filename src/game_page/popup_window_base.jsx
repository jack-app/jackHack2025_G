import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない

export class PopUpWindowBase {
  // x, y : from top-left of GameWindow
  // type : type of popup window

  constructor(x, y, onScoreUp) {
    this.x = x;
    this.y = y;
    this.onScoreUp = onScoreUp;
    this.dom = this.createWindowDom();
    this.dom.style.left = `${x}px`;
    this.dom.style.top = `${y}px`;
    this.disappeared = false;
  }

  close() {
    this.disappeared = true;
    this.dom.remove();
  }

  createWindowDom() {
    //! implementation of this function should be in derived class
    throw new Error("createWindow() method not implemented");
  }

  update() {
    //! implementation of this function should be in derived class
    throw new Error("update() method not implemented");
  }
}

import './popup_window_base.css';
export function PopUpWindowDOM({children, onClickClose}) {
    return <div class="popup-window">
        <header>
          <span class="popup-minimize-button popup-handle-button">_</span>
          <span class="popup-maximize-button popup-handle-button">□</span>
          <span class="popup-close-button popup-handle-button" onClick={onClickClose}>☓</span>
        </header>
        <div class="popup-content">
          {children}
        </div>
    </div>
}