import getBiggerCloseButtonSkillFactory from './bigger_close_button'; // バツボタンを大きくするスキル

export default class SkillManager {
   constructor( gameContainer, skillItemContainer, popUpManager ) {
      this.gameContainer = gameContainer; // ゲーム画面のコンテナ要素 クラスの付け替えを行う
      this.skillItemContainer = skillItemContainer; // スキルアイテムを追加するためのコンテナ要素
      this.popUpManager = popUpManager; // ポップアップウィンドウのマネージャー // スキルの効果の発動に使ってください
      const skillContext = {notifyClick: this.invokeSkill.bind(this), gameContainer};     
      this.skillSet = {
         0: [
            getBiggerCloseButtonSkillFactory(skillContext),
         ],
         1: [
         ],
         2: [

         ],
         3: [

         ],
      }
      this.skillStack = []; // 発動中のスキルの配列
   }

   invokeSkill( skillId ) {
      console.log("a skill is invoked", skillId);
      this.skillStack = this.skillStack.filter( // remove the invoked skill from the stack
         ( skill ) => {
            if ( skill.id !== skillId ) return true;
            this.skillItemContainer.removeChild( skill.dom ); // スキルアイテムをコンテナから削除
            skill.makeEffect(); // スキルの効果を発動
            return false;
         }
      );
   }

   triggerSkillInsertion( score ) {
      // スコアの増加時に確率でスキルを追加する

      if (Math.random() > 0.1) return; // スキルを獲得する確率
      
      if (score < 30) {
         this.appendSkill( 0 );
      } else if ( score < 50 ) {
         this.appendSkill( 1 );
      } else if ( score < 70 ) {
         this.appendSkill( 2 );
      } else {
         this.appendSkill( 3 );
      }
   }

   appendSkill( tier ) {
      let choices = [];
      for (let i = 0; i <= tier; i++) {
         choices = choices.concat(this.skillSet[i])
      }
      const skillFactory = choices[Math.floor(Math.random() * choices.length)];
      const skill = skillFactory();

      this.skillStack.push(skill);
      this.skillItemContainer.appendChild(skill.dom); // スキルアイテムをコンテナに追加
   }
}
