import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import { SkillBase, SkillItem } from "./skill_base";

export default class BiggerCloseButtonSkill extends SkillBase {
   constructor() {
      super( "BiggerCloseButton" );
      this.dom = new SkillItem( { onClick: this.onClick.bind( this ) } );
      console.log( this.dom );
      this.update();
   }

   update() {
      console.log( "BiggerCloseButton update", this );
      const innerHTML = ( this.active ) ?
         `<img src="https://via.placeholder.com/50" alt="Bigger Close Button" />` :
         `<img src="https://via.placeholder.com/20" alt="Normal Close Button" />`;
      console.log( innerHTML );
      this.dom.innerHTML = `${ innerHTML }`;
      console.log( "BiggerCloseButton update", this );
   }
   onClick() {
      console.log( "BiggerCloseButton clicked" );
      this.active = !this.active;
      this.update();

   }

}

