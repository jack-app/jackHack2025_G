// ゲーム全体の流れを書く．
// 個別具体な処理はクラスやファイルを分けたほうがよかろう．
export default class Game {
    constructor(startPage, gamePage, resultPage) {
        this.startPage = startPage;
        this.gamePage = gamePage;
        this.resultPage = resultPage;
    }

    async init() {
        await Promise.all([
            this.startPage.init(),
            this.gamePage.init(),
            this.resultPage.init()
        ]);
    }

    async launch() {
        await this.init();
        while (true) {
            console.log("メインループ");
            console.log("スタートページを表示します");
            this.startPage.show();
            await new Promise(resolve => setTimeout(resolve, 1000)); // 一秒待機
        }
    }
}