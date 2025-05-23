import { PopUpWindows } from "./popUpWindows";
import Konva from "konva";

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

      this.stage = new Konva.Stage( {
         container: this.elementId,
         width: this.width,
         height: this.height,
      } );
      this.layer = new Konva.Layer();
      this.stage.add( this.layer );

      this.windows = [];
   }

   createNewWindow() {
      if ( this.windows.length < 10 ) {
         const newWindow = new PopUpWindows( this.width, this.height );
         this.windows.push( newWindow );
         this.layer.add( newWindow.window );
      }
   }

   start() {
      // Create new windows periodically
      this.createInterval = setInterval( () => {
         this.createNewWindow();
      }, this.createFrameRate );

      // Update moving windows
      const anim = new Konva.Animation( () => {
         this.windows.forEach( ( win ) => win.update() );
      }, this.layer );
      anim.start();
      // this.updateInterval = setInterval( () => {
      //    this.windows.forEach( ( win ) => win.update() );
      // }, this.updateFrameRate );
   }

   stop() {
      if ( this.createInterval ) {
         clearInterval( this.createInterval );
         this.createInterval = null;
      }

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
