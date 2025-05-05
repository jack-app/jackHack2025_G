import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import { SkillBase, SkillItem } from "./skill_base";
t;
export default class TaskManager extends SkillBase {
   constructor() {
      super( "TaskManager" );
      this.dom = new SkillItem( { onClick: this.onClick.bind( this ) } );
      console.log( this.dom );
      this.update();
   }

   update() {
      console.log( "BiggerCloseButton update", this );
      const innerHTML = ( this.active ) ?
         `<img src="https://via.placeholder.com/50" alt="Bigger Close Button" />` :
         `<img src="https://via.placeholder.com/20" alt="Normal Close Button" />`;
      this.dom.innerHTML = `${ innerHTML }`;
   }
   onClick() {
      this.active = !this.active;
      this.update();

   }

}

