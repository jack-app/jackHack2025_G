import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import { SkillBase } from "./skill_base";
import skillIcon from "./bigger-close-button-icon.png";
import "./bigger_close_button.css"; // スキルのCSSをインポート

export default function getSkillFactory({notifyClick, gameContainer}) {
   return () => new BiggerCloseButtonSkill(notifyClick, gameContainer);
};

class BiggerCloseButtonSkill extends SkillBase {
   constructor(notifyClick, gameContainer) {
      super( "BiggerCloseButton", skillIcon, notifyClick);
      this.gameContainer = gameContainer;
      this.duration = 5000;
      this.rest = this.duration;
   }

   async makeEffect() {
      const startTime = Date.now();
      let elapsed = 0;
      while ( elapsed < this.duration ) {
         this.rest = this.duration - elapsed;
         this.gameContainer.classList.add( "skill-BiggerCloseButton-enabled" );
         await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );
         elapsed = Date.now() - startTime;
      }
      this.gameContainer.classList.remove( "skill-BiggerCloseButton-enabled" );
   }
}

