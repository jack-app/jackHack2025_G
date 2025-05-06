import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import "./popup_contents_Teshi.css"

export function RandomContent() {
    const options = [
        <CatContent/>,<DogContent/>,<BeafContent/>
    ]
    return options[Math.floor(Math.random() * options.length)];
}

function DogContent() {
    return <div class="Dog-Content">
        <p>犬はかわいい！！柴犬が好き！！</p>
        </div>
}

function CatContent() {
    return <div class="Cat-Content">
        <p>猫です。ねこ。</p>
        <img src="src\game_page\popups\asset\cat.jpg" width="160" height="70" alt="cat"/>
        </div>
}

function BeafContent() {
    return <div class="Beaf-Content">
        <p>牛は美味しい！！ハツが好き！！！</p>
        </div>
}