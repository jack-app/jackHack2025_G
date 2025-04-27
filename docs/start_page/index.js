import Page from '../page.js';

// スタート画面に特有の処理を置く．
// ゲームロジックを置かないように注意する．
export default class StartPage extends Page {
    constructor(container) {
        super(container, './start_page');
    }
}