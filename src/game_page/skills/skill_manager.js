import biggerCloseButtonSkillFactory from './bigger_close_button'; // バツボタンを大きくするスキル
import TaskManager from './task_manager';

// 発動中のスキルの状態を表す．
// 各種処理はこの状態を参照して行う．

// バツボタンの大きさの変更にあたって動的にCSSを変更したいときは，
// game-page-containerのクラスを変更すると良い.
// #game-page-container {...} 下に通常時のスタイル，
// #game-page-container.skill-active {...} 下にスキル発動中のスタイルを書き，
// スキル発動中はgame-page-containerにskill-activeクラスを追加するようにすれば，スキル発動中のみ見た目や大きさを変更することができる．
export default class SkillManager {
   constructor( gameContainer, skillItemContainer ) {
      this.gameContainer = gameContainer; // ゲーム画面のコンテナ要素 クラスの付け替えを行う
      this.skillItemContainer = skillItemContainer; // スキルアイテムを追加するためのコンテナ要素
      const skillContext = {notifyClick: this.invokeSkill.bind(this), gameContainer};     
      this.skillSet = [
         biggerCloseButtonSkillFactory(skillContext),
         
      ]; // 発動可能なスキルの配列
      // temporal code below
      this.skillStack = this.skillSet.map((factory)=>factory()); // 今，発動可能なスキルの配列
      for ( const skill of this.skillStack ) {
         this.skillItemContainer.appendChild( skill.dom ); // スキルアイテムをコンテナに追加
      }
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

   appendNewSkill( skill ) {
      this.skillStack.push( skill );
   }
}
