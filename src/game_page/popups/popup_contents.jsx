import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない

export function RandomContent() {
    const options = [
        <SampleContent/>,<CatContent/>
    ]
    return options[Math.floor(Math.random() * options.length)];
}

function SampleContent() {
    return <p>Sample Content</p>
}
function CatContent() {
    return <p>猫です。ねこ。</p>//<img src="https://placekitten.com/200/300" alt="Cat" />
}