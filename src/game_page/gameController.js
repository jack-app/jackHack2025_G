import defaultPopUpFactory from "./popups/default_popup";
import movingPopUpFactory from "./popups/moving_popup";
import multiPopUpFactory from "./popups/multi_popup";

const popupKinds = [
    defaultPopUpFactory,
    movingPopUpFactory,
    multiPopUpFactory,
]

function pickRandomPopUp() {
  return popupKinds[Math.floor(Math.random() * popupKinds.length)]
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class GameController {
  constructor(gameSetUp, gameResult, popupContainer, gameEndCallback) {
    // messengers
    this.gameSetUp = gameSetUp;
    this.gameResult = gameResult;

    // popup windows
    this.windows = [];
    this.frameInterval = null;
    this.framerate = 40; // FPS
    this.popUpContainer = popupContainer;
    this.lastPopUpTrigger = null;
    this.timer = 0; // ポップアップタイマー
    this.gametimer = 0; // ゲームタイマー
    this.popUpInterval = gameSetUp.initialPopupInterval ?? 1000; // ポップアップの間隔

    // game over
    this.gameEndCallback = gameEndCallback;
  }

  onScoreUp() {
    this.gameResult.score += 1;
  }

  getWindowToPopUp(elapsed) { // elapsed.. タイマーの増分
    const popupContext = { // to give all of information PopUpWindow needs
      onScoreUp: () => this.onScoreUp(), 
      parent: this.popUpContainer,
      framerate: this.framerate,
    };

    if (elapsed === null) {
        // ここは最初だけ実行される
        const newWindow = defaultPopUpFactory(popupContext);
        return newWindow;
    }

    this.gametimer += elapsed;
    for (let i = 1; i < 15; i++){
    if (this.gametimer > i*1000) {
      // 10秒経過したらポップアップの間隔を短くする
      this.popUpInterval = Math.max(500, this.popUpInterval - 200); // 1秒未満にはならない
    }
  }
    this.timer += elapsed;
    // popupの出現間隔は動的に変更可
    // dynamic interval gives more choice, right?
    // Poping up can be faster as the game goes on
    if (this.timer < this.popUpInterval) return null; // この場合何もしない

    const randomPopup = pickRandomPopUp()
    const newWindow = randomPopup(popupContext);

    this.timer = 0; // reset the timer
    return newWindow; // return an array of windows
  }

  async insertWindowsSequently(first) {
    let newWindow = first;
    while (newWindow !== null) {
      if (newWindow) {
        this.popUpContainer.appendChild(newWindow.dom);
        this.windows.push(newWindow);
      }
      newWindow = newWindow.getSubsequentPopUp();
      if (newWindow) await sleep(newWindow.intervalInMili);
    }
  }

  insertWindow(newWindow) {
    if (newWindow.multiPop) {
      // multiPopがtrueのときは一定間隔で複数のウィンドウを出現させる
      this.insertWindowsSequently(newWindow);
    } else {
      this.popUpContainer.appendChild(newWindow.dom);
      this.windows.push(newWindow);
    }
  }

  triggerWindowPopup() {
    let elapsed = null;
    if (this.lastPopUpTrigger) {
      elapsed = Date.now() - this.lastPopUpTrigger; // in milliseconds
    }
    
    const newWindow = this.getWindowToPopUp(elapsed);
    if (newWindow !== null) {
      this.insertWindow(newWindow);
    }

    this.lastPopUpTrigger = Date.now();
  }

  cleanUp() {
    // this is needed to judge the number of windows corrently
    this.windows = this.windows.filter((win) => !win.disappeared);
  }

  judgeEnd() {
    return this.windows.length > this.gameSetUp.maxWindowCount
  }

  start() {
    this.frameInterval = setInterval(() => {
      this.triggerWindowPopup();
      this.windows.forEach((win) => win.update());
      this.cleanUp();
      if (this.judgeEnd()) {
        this.stop();
        this.gameEndCallback();
      }
    }, 1000/this.framerate); // this.framerate FPSのループを回す
  }

  stop() {
    if (this.frameInterval) {
      clearInterval(this.frameInterval); // frameループを止める
      this.frameInterval = null;
    }

    // Clean up windows
    this.popUpContainer.replaceChildren();
    this.windows = [];
  }
}
