import Page from '../page.js';

// 結果画面に特有の処理を置く．
// ゲームロジックを置かないように注意する．
export default class ResultPage extends Page {
    constructor(container) {
        super(container, './result_page');
    }
}