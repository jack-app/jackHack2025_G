import Konva from "konva";

export class PopUpWindows {
   constructor( gameWith, gameHeight ) {
      this.width = 200;
      this.height = 150;
      this.maxX = gameWith - this.width;
      this.maxY = gameHeight - this.height;

      this.x = Math.random() * this.maxX;
      this.y = Math.random() * this.maxY;
      this.speed = 2; // Default speed
      this.direction = Math.random() * Math.PI * 2; // Random direction in radians
      this.window = this.create();
   }
   create() {
      const group = new Konva.Group( {
         x: this.x,
         y: this.y,
      } );
      const rect = new Konva.Rect( {
         width: this.width,
         height: this.height,
         fill: "lightblue",
         stroke: "black",
         strokeWidth: 1,
         cornerRadius: 10,
      } );
      const botton = new Konva.Rect( {
         width: 20,
         height: 20,
         fill: "red",
      } );
      const text = new Konva.Text( {
         text: "X",
         fontSize: 20,
         fontFamily: "Calibri",
         fill: "white",
         x: 5,
         y: 2,
      } );
      const title = new Konva.Text( {
         text: "Pop Up Window",
         fontSize: 20,
         fontFamily: "Calibri",
         fill: "black",
         x: 30,
         y: 5,
      } );


      group.add( rect );
      group.add( title );
      group.add( botton );
      group.add( text );
      text.on( "pointerclick", () => {
         alert( "clicked" );
         group.destroy();
      } );
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
      this.window.x( this.x );
      this.window.y( this.y );
   }

}
