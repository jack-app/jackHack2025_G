import React from "react";
import { createRoot } from "react-dom/client";
import "./popup_window.css";
export class PopUpWindowBase {
  // x, y : from top-left of GameWindow
  // type : type of popup window

  constructor(x, y, type, onclick) {
    this.x = x;
    this.y = y;
    this.type = type;
    // this.window = document.createElement("div");
    this.window = this.createWindow(onclick);
    // this.window.className = "popup-window";
    this.window.style.left = `${x}px`;
    this.window.style.top = `${y}px`;
  }

  createWindow() {
    //! implementation of this function should be in derived class
    throw new Error("createWindow() method not implemented");
  }

  update() {
    //! implementation of this function should be in derived class
    throw new Error("update() method not implemented");
  }
}

export class PopUpWindow extends PopUpWindowBase {
  constructor(x, y, type, onclick) {
    super(x, y, type, onclick);
  }

  createWindow(onclick) {
    const container = document.createElement("div");
    const root = createRoot(container);
    root.render(
      <div className="popup-window">
        <h1>Popup Window</h1>
        <p>This is a popup window.</p>
        <button
          onClick={() => {
            console.log("Button clicked");
            if (onclick) {
              onclick();
            }
          }}
        >
          Click Me
        </button>
      </div>
    );

    container.style.position = "absolute";
    container.style.left = `${this.x}px`;
    container.style.top = `${this.y}px`;

    return container;
  }

  update() {}
}

export class MovingPopUpWindow extends PopUpWindowBase {
  constructor(x, y, type) {
    super(x, y, type);
    this.speed = 5; // Default speed
    this.direction = Math.random() * Math.PI * 2; // Random direction in radians
  }

  setSpeed(speed) {
    this.speed = speed;
    return this;
  }
  setDirection(direction) {
    this.direction = direction;
    return this;
  }

  createWindow() {
    const element = document.createElement("div");
    element.className = "popup-window";

    Object.assign(element.style, {
      position: "absolute",
      width: "200px",
      height: "150px",
      backgroundColor: "lightblue",
      border: "1px solid black",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "left 0.5s, top 0.5s",
    });

    return element;
  }

  update() {
    const x_speed = Math.cos(this.direction) * this.speed;
    const y_speed = Math.sin(this.direction) * this.speed;
    this.x += x_speed;
    this.y += y_speed;
    this.window.style.left = `${this.x}px`;
    this.window.style.top = `${this.y}px`;
  }
}
