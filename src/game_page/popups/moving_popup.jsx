import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "../popup_window_base";

export default class MovingPopUp extends PopUpWindowBase {
  constructor(x, y, onScoreUp) {
    super(x, y, onScoreUp);
    this.speed = 1;
    this.direction = Math.random() * 2 * Math.PI; // 0 to 2π
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

  update() {
    const x_speed = Math.cos(this.direction) * this.speed;
    const y_speed = Math.sin(this.direction) * this.speed;
    this.x += x_speed;
    this.y += y_speed;
    this.dom.style.left = `${this.x}px`;
    this.dom.style.top = `${this.y}px`;
  }
}
