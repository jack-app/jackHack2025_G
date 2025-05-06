import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない

function getIdOfSkillItem() {
   return crypto.randomUUID();
}

export class SkillBase {
   constructor( name, iconSrc, notifyClick ) { // skill_item = skillのICONなるDOM
      this.name = name;
      this.id = getIdOfSkillItem(); 
      this.notifyClick = notifyClick; // スキルが発動したときの処理
      this.dom = SkillItem({onClick: ()=>this.notifyClick(this.id), iconSrc, name});
   }
 
   makeEffect() {
      // ! override this
      throw new Error( 'makeEffect() not implemented' );
   }
}

export function SkillItem( { onClick, iconSrc, name } ) {
   return <div class="skill-item" onClick={ onClick }>
      <img src={ iconSrc } alt={ name } height={`20px`} width={`20px`}/>
   </div>;
}
