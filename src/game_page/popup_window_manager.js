import { PopUpWindow, MovingPopUpWindow } from "./popup_window";

export class PopUpWindowManager {
  constructor(options = {}) {
    this.windows = [];
    this.createInterval = null;
    this.updateInterval = null;

    // Frame rates in milliseconds (default: 2000ms for creation, 1000ms for updates)
    this.createFrameRate = options.createFrameRate ?? 2000;
    this.updateFrameRate = options.updateFrameRate ?? 50; // 20 Hz
    this.elementId = options.elementId ?? "game-window";
    this.element = document.getElementById(this.elementId);
  }

  getCreateFrameRate() {
    return this.createFrameRate;
  }

  getUpdateFrameRate() {
    return this.updateFrameRate;
  }

  createNewWindow() {
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

    this.element.appendChild(newWindow.window);
    this.windows.push(newWindow);
  }

  start() {
    // Create initial windows
    // for (let i = 0; i < 3; i++) {
    //   this.createNewWindow();
    // }

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

// class Game {
//   constructor() {
//     this.popupmanager = new PopUpWindowManager({
//       createFrameRate: 2000,
//       updateFrameRate: 50,
//       elementId: "game-window",
//     });
//   }

//   start() {
//     // Initialize and start the game
//     this.popupmanager.start();
//   }

//   end() {
//     // End the game
//     this.popupmanager.stop();
//   }
// }
