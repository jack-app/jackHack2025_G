import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import "./popupcontents-potato.css"
import { defaultWindowHeight, defaultWindowWidth } from './const';

export function RandomContent() {
    const options = [
        <SampleContent/>,
        <Virus/>,
        <Coffee/>,
        <Uranai/>
    ]
    return options[Math.floor(Math.random() * options.length)];
}

function SampleContent() {
    return <p>Sample Content</p>
}

function Virus() {
    return <img src="src/game_page/popups/asset/meiwakugazou.png" width={defaultWindowWidth} height={defaultWindowHeight} />
}

function Coffee() {
    return <img src="src/game_page/popups/asset/cancoffee.png" width={defaultWindowWidth} height={defaultWindowHeight} />
}

function Uranai() {
    return <img src="src/game_page/popups/asset/uranai.png" width={defaultWindowWidth} height={defaultWindowHeight} />
}