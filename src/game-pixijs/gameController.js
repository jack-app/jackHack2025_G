import { Application } from "pixi.js";
import { PopUpWindows } from "./popUpWindows";

export class GameController {
   constructor( options = {} ) {
      this.createInterval = null;
      this.updateInterval = null;

      // Frame rates in milliseconds (default: 2000ms for creation, 1000ms for updates)
      this.createFrameRate = options.createFrameRate ?? 2000;
      this.updateFrameRate = options.updateFrameRate ?? 50; // 20 Hz
      this.elementId = options.elementId ?? "game-window";
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.windows = [];
      this.element = document.getElementById( this.elementId );
      this.app = new Application();
      this.app.init( {
         width: this.width,
         height: this.height,
         backgroundAlpha: 0,
      } ).then( () => {
         this.element.appendChild( this.app.canvas );
         this.start();
      } );
   }

   createNewWindow() {
      if ( this.windows.length < 10 ) {
         const newWindow = new PopUpWindows( this.width, this.height );
         this.windows.push( newWindow );
         this.app.stage.addChild( newWindow.window );
      }
   }

   start() {
      // Create new windows periodically
      let elapsedTime = 0;
      this.app.ticker.add( ( time ) => {
         elapsedTime += time.elapsedMS;
         if ( elapsedTime > this.createFrameRate ) {
            elapsedTime -= this.createFrameRate;
            this.createNewWindow();
         }
      } );

      // Update moving windows
      this.app.ticker.add( () => {
         this.windows.forEach( ( win ) => win.update() );
      } );
      this.app.start();
   }

   stop() {

      // if ( this.updateInterval ) {
      //    clearInterval( this.updateInterval );
      //    this.updateInterval = null;
      // }
      this.windows.forEach( ( win ) => {
         if ( win.window.parentNode ) {
            win.window.parentNode.removeChild( win.window );
         }
      } );
      this.windows = [];
   }
}

// class Game
