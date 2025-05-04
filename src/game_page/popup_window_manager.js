import { PopUpWindow, MovingPopUpWindow } from "./popup_window";

export class PopUpWindowManager {
  constructor(gameSetup, popUpFactory) {
    this.windows = [];
    this.createInterval = null;
    this.updateInterval = null;

    // Frame rates in milliseconds (default: 2000ms for creation, 1000ms for updates)
    this.createFrameRate = gameSetup.createFrameRate ?? 2000;
    this.updateFrameRate = 50; // 20 Hz
    this.popUpContainer = document.getElementById("game-window");
    this.popUpFactory = popUpFactory;
  }

  createNewWindow() {
     if ( this.windows.length < 10 ) {

        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 150);
        const isMoving = Math.random() > 0.5;

        const newWindow = isMoving
        ? new MovingPopUpWindow(x, y, "default")
        .setSpeed(100 / this.updateFrameRate)
        .setDirection(Math.random() * Math.PI * 2)
        : new PopUpWindow(x, y, "default");

        // const newWindow = new PopUpWindow(x, y, "default");
        console.log(newWindow);

        this.popUpContainer.appendChild(newWindow.window);
        this.windows.push(newWindow);
      }
  }

  start() {
    // Create new windows periodically
    this.createInterval = setInterval(() => {
      this.createNewWindow();
    }, this.createFrameRate);

    // Update moving windows
    this.updateInterval = setInterval(() => {
      this.windows.forEach((win) => win.update());
    }, this.updateFrameRate);
  }

  stop() {
    if (this.createInterval) {
      clearInterval(this.createInterval);
      this.createInterval = null;
    }

    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    // Clean up windows
    this.windows.forEach((win) => {
      if (win.window.parentNode) {
        win.window.parentNode.removeChild(win.window);
      }
    });
    this.windows = [];
  }
}
