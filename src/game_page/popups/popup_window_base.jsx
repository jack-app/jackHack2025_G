import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない

export class PopUpWindowBase {
   // x, y : from top-left of GameWindow
   // type : type of popup window

   constructor( parent, width, height, onScoreUp, onClose, x, y ) {
      this.id = Math.random().toString( 36 ).substring( 2, 15 );
      this.parent = parent;
      this.width = width;
      this.height = height;
      this.x = x ?? Math.random() * ( this.parent.clientWidth - this.width );
      this.y = y ?? Math.random() * ( this.parent.clientHeight - this.height );

      this.onScoreUp = onScoreUp;
      this.dom = this.createWindowDom();
      this.dom.style.position = "absolute";
      this.dom.style.left = `${ this.x }px`;
      this.dom.style.width = `${ this.width }px`;
      this.dom.style.top = `${ this.y }px`;
      this.dom.style.height = `${ this.height }px`;

      this.multiPop = false;
      this.intervalInMili = 0;
      this.onClose = onClose;
   }

   createWindowDom() {
      //! implementation of this function should be in derived class
      throw new Error( "createWindow() method not implemented" );
   }

   update() {
      //! implementation of this function should be in derived class
      throw new Error( "update() method not implemented" );
   }
}

import './popup_window_base.css';
export function PopUpWindowDOM( { children, onClickClose } ) { // 必ずしも使う必要はなし
   return <div class="popup-window">
      <div class="popup-background" />
      <header class="popup-header">
         <div class="popup-image" />
         <div class="popup-title"> { 'PopUp' } </div>
         <div class="popup-buttons">
            <span class="popup-minimize-button popup-handle-button" />
            <span class="popup-maximize-button popup-handle-button"></span>
            <span class="popup-close-button popup-handle-button" onClick={ onClickClose } />
         </div>
      </header>
      <div class="popup-content">
         { children }
      </div>
   </div>;
}
