import { Container, Graphics, Text } from "pixi.js";

export class PopUpWindows {
   constructor( gameWith, gameHeight ) {
      this.width = 200;
      this.height = 150;
      this.maxX = gameWith - this.width;
      this.maxY = gameHeight - this.height;

      this.x = Math.random() * this.maxX;
      this.y = Math.random() * this.maxY;
      this.speed = 1; // Default speed
      this.direction = Math.random() * Math.PI * 2; // Random direction in radians
      this.window = this.create();
   }
   create() {
      const group = new Container( {
         x: this.x,
         y: this.y,
      } );
      const rect = new Graphics().rect( 0, 0, this.width, this.height ).fill( "lightblue" ).setStrokeStyle( 1, "black" );
      const button = new Graphics().rect( 0, 0, 20, 20 ).fill( "red" );
      const title = new Text( {
         text: "Pop Up Window",
         style: {
            fontSize: 20,
            fontFamily: "Calibri",
            fill: "black",
         },
         x: 30,
         y: 0,
      } );
      button.eventMode = 'static';
      button.cursor = 'pointer';
      button.onclick = () => {
         alert( "clicked" );
      };
      group.addChild( rect );
      // group.addChild( text );
      group.addChild( title );
      group.addChild( button );

      return group;
   }


   update() {
      const x_speed = Math.cos( this.direction ) * this.speed;
      const y_speed = Math.sin( this.direction ) * this.speed;
      this.x += x_speed;
      this.y += y_speed;
      if ( this.x < 0 ) {
         this.direction = Math.PI - this.direction;
         this.x = 0;
      }
      if ( this.x > this.maxX ) {
         this.direction = Math.PI - this.direction;
         this.x = this.maxX;
      }
      if ( this.y < 0 ) {
         this.direction = -this.direction;
         this.y = 0;
      }
      if ( this.y > this.maxY ) {
         this.direction = -this.direction;
         this.y = this.maxY;
      }
      this.window.x = this.x;
      this.window.y = this.y;
   }

}
