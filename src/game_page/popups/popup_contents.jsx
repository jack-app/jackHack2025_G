import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import "./popup_contents_Teshi.css"
import "./popupcontents-potato.css"
import { defaultWindowHeight, defaultWindowWidth } from './const';
import cat_image from './asset/cat.jpg'
import meiwaku_image from './asset/meiwakugazou.png'
import cancoffee_image from './asset/cancoffee.png'
import uranai_image from './asset/uranai.png'

export function RandomContent() {
    const options = [
        <CatContent/>,<DogContent/>,<BeafContent/>,
        <Virus/>,
        <Coffee/>,
        <Uranai/>
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
        <img src={cat_image} width="160" height="70" alt="cat"/>
        </div>
}

function BeafContent() {
    return <div class="Beaf-Content">
        <p>牛は美味しい！！ハツが好き！！！</p>
        </div>
}
function Virus() {
    return <img src={meiwaku_image} width={defaultWindowWidth} height={defaultWindowHeight} />
}

function Coffee() {
    return <img src={cancoffee_image} width={defaultWindowWidth} height={defaultWindowHeight} />
}

function Uranai() {
    return <img src={uranai_image} width={defaultWindowWidth} height={defaultWindowHeight} />
}