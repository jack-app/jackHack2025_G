import { framerate } from "./const";

export default class PopUpWindowManager {
  constructor(popupContainer, popUpFactory) {
    this.windows = [];
    this.frameInterval = null;

    this.windowCountListeners = [];
    this.scoreUpListeners = [];

    this.popUpContainer = popupContainer;
    this.popUpFactory = popUpFactory;

    this.lastPopUpTrigger = null;
  }

  addWindowCountListener(listener) {
    this.windowCountListeners.push(listener);
  }

  addScoreUpListener(listener) {
    this.scoreUpListeners.push(listener);
  }

  onScoreUp() {
    this.scoreUpListeners.forEach((listener) => listener());
  }

  triggerWindowPopup() {
    let elapsed = null;
    if (this.lastPopUpTrigger) {
      elapsed = Date.now() - this.lastPopUpTrigger; // in milliseconds
    }
    const newWindows = this.popUpFactory.arrayOfNewWindows(() => this.onScoreUp(), elapsed);
    newWindows.forEach((newWindow) => {
      this.popUpContainer.appendChild(newWindow.dom);
      this.windows.push(newWindow);
    });
    this.lastPopUpTrigger = Date.now();
  }

  cleanUp() {
    this.windows = this.windows.filter((win) => !win.disappeared);
  }

  start() {
    this.frameInterval = setInterval(() => {
      this.triggerWindowPopup();
      this.windows.forEach((win) => win.update());
      this.cleanUp();
      this.windowCountListeners.forEach((listener) => listener(this.windows.length));
    }, framerate);
  }

  stop() {
    if (this.frameInterval) {
      clearInterval(this.frameInterval);
      this.frameInterval = null;
    }

    // Clean up windows
    this.popUpContainer.replaceChildren();
    this.windows = [];
  }
}
