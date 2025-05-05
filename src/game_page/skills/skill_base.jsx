import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない

export class SkillBase {
   constructor( name ) { // skill_item = skillのICONなるDOM
      this.name = name;
      this.active = false; // スキルが発動中かどうか
   }

   update() {
      // ! override this
      throw new Error( "update() not implemented in SkillBase" );
   }

   onClick() {
      // ! override this
      throw new Error( "onClick() not implemented in SkillBase" );
   }

}

export function SkillItem( { children, onClick } ) {
   return <div class="skill-item" onClick={ onClick }>
      { children }
   </div>;
}
