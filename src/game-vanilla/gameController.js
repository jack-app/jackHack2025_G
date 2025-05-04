import { PopUpWindows } from "./popUpWindows";

export class GameController {
   constructor( options = {} ) {
      this.createInterval = null;
      this.updateInterval = null;

      // Frame rates in milliseconds (default: 2000ms for creation, 1000ms for updates)
      this.createFrameRate = options.createFrameRate ?? 2000;
      this.updateFrameRate = options.updateFrameRate ?? 50; // 20 Hz
      this.elementId = options.elementId ?? "game-window";

      this.element = document.getElementById( this.elementId );
      this.windows = [];
   }

   createNewWindow() {
      if ( this.windows.length < 10 ) {
         const newWindow = new PopUpWindows( this.element );
         this.windows.push( newWindow );
         this.element.appendChild( newWindow.window );
      }
   }

   start() {
      // Create new windows periodically
      this.createInterval = setInterval( () => {
         this.createNewWindow();
      }, this.createFrameRate );

      // Update moving windows
      this.updateInterval = setInterval( () => {
         this.windows.forEach( ( win ) => win.update() );
      }, this.updateFrameRate );
   }

   stop() {
      if ( this.createInterval ) {
         clearInterval( this.createInterval );
         this.createInterval = null;
      }

      if ( this.updateInterval ) {
         clearInterval( this.updateInterval );
         this.updateInterval = null;
      }
      this.windows.forEach( ( win ) => {
         if ( win.window.parentNode ) {
            win.window.parentNode.removeChild( win.window );
         }
      } );


      this.windows = [];
   }
}

// class Game
