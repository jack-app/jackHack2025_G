import { h, Fragment } from 'start-dom-jsx';
import { PopUpWindowBase, PopUpWindowDOM } from './popup_window_base';
import { defaultWindowHeight, defaultWindowWidth } from './const';
import { RandomContent } from './popup_contents';

export default function flickeringPopUpFactory({ parent, onScoreUp, onClose }) {
  return new FlickeringPopUp(parent, onScoreUp, onClose);
}

class FlickeringPopUp extends PopUpWindowBase {
  constructor(parent, onScoreUp, onClose) {
    super(parent, defaultWindowWidth, defaultWindowHeight, onScoreUp, onClose);
    
    this.visible = true;
    this.toggleInterval = 200; // 点滅間隔（ms）

    this.startFlickering();
  }

  startFlickering() {
    this.flickerIntervalId = setInterval(() => {
      this.visible = !this.visible;
      this.dom.style.opacity = this.visible ? '1' : '0.05';
    }, this.toggleInterval);
  }

  stopFlickering() {
    clearInterval(this.flickerIntervalId);
  }

  createWindowDom() {
    return <PopUpWindowDOM
      onClickClose={() => {
        this.onScoreUp();
        this.stopFlickering();
        this.onClose( this );
      }}
    >
      <RandomContent />
    </PopUpWindowDOM>;
  }

  update() {
    // 点滅ロジックは setInterval で管理されるので update は使わない
  }
}
