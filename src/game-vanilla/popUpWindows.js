
export class PopUpWindows {
   constructor( parents ) {
      this.parents = parents;
      this.window = this.create();
      this.x = Math.random() * ( window.innerWidth - 200 );
      this.y = Math.random() * ( window.innerHeight - 150 );
      this.width = 200;
      this.height = 150;
      this.speed = 5; // Default speed
      this.direction = Math.random() * Math.PI * 2; // Random direction in radians
   }
   create() {
      const innerHtml = `
         <div class="popup-content">
            <div class="popup-header">
               <button class="popup-close" onclick={alert('toto')}>X</button>
               <h2 class="popup-title">Pop Up Window</h2>
            </div>
            <div class="popup-body">
               <p>This is a pop-up window.</p>
               <p>Click the "X" button to close it.</p>
            </div>
         </div>
      `;
      const element = document.createElement( "div" );
      element.className = "popup-window";

      Object.assign( element.style, {
         position: "absolute",
         left: `${ this.x }px`,
         top: `${ this.y }px`,
         width: `${ this.width }px`,
         height: `${ this.height }px`,
         backgroundColor: "lightblue",
         border: "0px solid black",
         margin: "0px",
         padding: "0px",
         borderRadius: "10px",
         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
      } );
      element.innerHTML = innerHtml;
      return element;
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
      if ( this.x > this.parents.clientWidth - this.width ) {
         this.direction = Math.PI - this.direction;
         this.x = this.parents.clientWidth - this.width;
      }
      if ( this.y < 0 ) {
         this.direction = -this.direction;
         this.y = 0;
      }
      if ( this.y > this.parents.clientHeight - this.height ) {
         this.direction = -this.direction;
         this.y = this.parents.clientHeight - this.height;
      }
      this.window.style.left = `${ this.x }px`;
      this.window.style.top = `${ this.y }px`;
   }

}
