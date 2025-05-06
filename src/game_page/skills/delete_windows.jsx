import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import { SkillBase } from "./skill_base";
import skillIcon from "./delete-windows-icon.png";

export default function getSkillFactory({notifyClick, gameContainer, popUpManager}) {
   return () => new DeleteWindowsSkill(notifyClick, gameContainer, popUpManager);
};

class DeleteWindowsSkill extends SkillBase {
   constructor(notifyClick, gameContainer, popUpManager) {
      super( 'DeleteWindows', skillIcon, notifyClick);
      this.gameContainer = gameContainer;
      this.popUpManager = popUpManager;
      this.deletenum = 5; //消す数
   }

   async makeEffect() {
    for (let i=0; i<this.deletenum; i++){
        this.popUpManager.deleteWindow()
    }
   }
}

