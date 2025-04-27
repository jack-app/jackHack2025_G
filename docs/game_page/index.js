import Page from '../page.js';

// ゲーム画面に特有の処理を置く．
// ここには特にゲームロジックを置かないように注意する．ゲームの進行を管理するのはGameクラスの仕事である．
export default class GamePage extends Page {
    constructor(container) {
        super(container, './game_page');
    }
}