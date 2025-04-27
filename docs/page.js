// StartPage, GamePage, ResultPageに継承されるクラス．
// すべてのページで共通の処理を置く．
export default class Page {
    constructor(container, endpoint) {
        this.page_container = container;
        this.endpoint = endpoint;
    }

    async init(){ //ページを初期化する．すなわち，HTMLを取得して埋め込む
        await fetch(this.endpoint)
        .then(res => res.text())
        .then(data => this.page_container.innerHTML = data);
    }
    
    show() { // ページを表示する
        this.page_container.style.display = "block";
    }

    hide() { // ページを非表示にする
        this.page_container.style.display = "none";
    }
}
