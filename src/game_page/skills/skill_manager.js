import BiggerCloseButtonSkill from './bigger_close_button'; // バツボタンを大きくするスキル

// 発動中のスキルの状態を表す．
// 各種処理はこの状態を参照して行う．

// バツボタンの大きさの変更にあたって動的にCSSを変更したいときは，
// game-page-containerのクラスを変更すると良い.
// #game-page-container {...} 下に通常時のスタイル，
// #game-page-container.skill-active {...} 下にスキル発動中のスタイルを書き，
// スキル発動中はgame-page-containerにskill-activeクラスを追加するようにすれば，スキル発動中のみ見た目や大きさを変更することができる．
export default class SkillManager {
    constructor(gameContainer, skillItemContainer) {
        this.gameContainer = gameContainer; // ゲーム画面のコンテナ要素 クラスの付け替えを行う
        this.skillItemContainer = skillItemContainer; // スキルアイテムを追加するためのコンテナ要素
        this.skillStack = [new BiggerCloseButtonSkill()]; // 発動可能なスキルの配列

        // temporal code below
        for (const skill of this.skillStack) {
            this.skillItemContainer.appendChild(skill.dom); // スキルアイテムをコンテナに追加
        }
    }
    appendNewSkill(skill) {
        this.skillStack.push(skill);
    }
}