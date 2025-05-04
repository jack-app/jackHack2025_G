import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import "./user_select_area.css"
import button_image from "./button-dummy.png"

export default function UserSelectArea(props) {
    return <div class="user-select-area">
        <div class="display-box">
            <div class="user-icon"></div>
            <div class="letters">
                <p>Player</p>
                <p>ユーザー名の入力</p>
            </div>
        </div>
        <div class="input-box">
            <input onChange={(element) => props.handler.updateUserName(element.target.value)}/>
            <img src={button_image} onClick={() => props.handler.startGame()}/>
        </div>
    </div>
}