import { h, Fragment } from 'start-dom-jsx'; // JSX用
import { PopUpWindowBase, PopUpWindowDOM } from "./popup_window_base";
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';

export default function evadePopUpFactory({ onScoreUp, parent, framerate }) {
  return new EvadePopUp(parent, onScoreUp, framerate);
}

class EvadePopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp, framerate) {
    super(parent, defaultWindowWidth, defaultWindowHeight, onScoreUp);
    this.framerate = framerate;
    this.speed = 150 / framerate; // 少し速めに逃げる
    this.mouseX = null;
    this.mouseY = null;

    // マウス座標を監視
    window.addEventListener("mousemove", this.trackMouse);
  }

  createWindowDom() {
    return <PopUpWindowDOM
      onClickClose={() => {
        this.onScoreUp();
        this.close();
        window.removeEventListener("mousemove", this.trackMouse);
      }}
    >
      <RandomContent />
    </PopUpWindowDOM>;
  }

  trackMouse = (e) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  update() {
    if (this.mouseX === null || this.mouseY === null) return;

    const winCenterX = this.x + this.width / 2;
    const winCenterY = this.y + this.height / 2;
    const dx = winCenterX - this.mouseX;
    const dy = winCenterY - this.mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      // カーソルが近い時は逃げる
      const normX = dx / distance;
      const normY = dy / distance;
      this.x += normX * this.speed;
      this.y += normY * this.speed;

      // 画面外に出ないように制限
      this.x = Math.max(0, Math.min(this.parent.clientWidth - this.width, this.x));
      this.y = Math.max(0, Math.min(this.parent.clientHeight - this.height, this.y));
    }

    this.dom.style.left = `${this.x}px`;
    this.dom.style.top = `${this.y}px`;
  }

  close() {
    super.close();
    window.removeEventListener("mousemove", this.trackMouse);
  }
}
