import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { RandomContent } from './popup_contents';

export default function movingPopUpFactory({onScoreUp, parent, framerate}) {
  return new MovingPopUp(parent, onScoreUp, framerate);
}

class MovingPopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp, framerate) {
    super(parent, 200, 150, onScoreUp);
    this.parents = parent
    this.speed = 100 / framerate; // 100px / second
    this.direction = Math.random() * 2 * Math.PI; // 0 to 2π
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
    const x_speed = Math.cos( this.direction ) * this.speed;
    const y_speed = Math.sin( this.direction ) * this.speed;
    this.x += x_speed;
    this.y += y_speed;
    if ( this.x < 0 ) {
       this.direction = Math.PI - this.direction;
       this.x = 0;
    }
    if ( this.x > this.parents.clientWidth - this.width ) {
       this.direction = Math.PI - this.direction;
       this.x = this.parents.clientWidth - this.width;
    }
    if ( this.y < 0 ) {
       this.direction = -this.direction;
       this.y = 0;
    }
    if ( this.y > this.parents.clientHeight - this.height ) {
       this.direction = -this.direction;
       this.y = this.parents.clientHeight - this.height;
    }
    this.dom.style.left = `${ this.x }px`;
    this.dom.style.top = `${ this.y }px`;
  }
}
