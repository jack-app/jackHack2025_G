import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import "./main.css"
import windows_logo from "./windows.jpg"

import { GameSetUp } from "../messengers"

class StartPageHandler {
    constructor(gameSetup) {
        this.gameSetup = gameSetup ?? new GameSetUp()
        this.watingGameStart = []
    }

    waitForGameStart() {
        // resolveが呼ばれるまで待機する．resolveはstartGameが呼ばれたときに呼ばれる
        return new Promise((resolve) => {
            this.watingGameStart.push(resolve)
        })
    }

    startGame() {
        this.watingGameStart.forEach((resolve) => resolve())
        this.watingGameStart = []
    }

    updateUserName(username) {
         this.gameSetup.username = username
    }

    updateDifficulty(difficulty) {
        this.gameSetup.difficulty = difficulty
   }
}

function StartPageContentRoot(props) {
    return <div id="start-page-container">
        <div id="start-header"></div>

        <div id="start-body-up-line"></div>

        <div id="start-body">
            <div id="start-body-left">
                <img src={windows_logo} id="windows-logo" alt="windows logo" />
                <p>explain</p>
            </div>
            <div id="start-body-middle-line"></div>
            <div id="start-body-right">
                <UserSelectArea handler={props.handler}/>
            </div>
        </div>

        <div id="start-body-bottom-line"></div>

        <div id="start-footer">
            <DifficultySelector handler={props.handler}/>
        </div>   
    </div>
}

import "./user-select-area.css"
import button_image from "./button-dummy.png"

function UserSelectArea(props) {
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

function DifficultySelector(props) {
    return <div id="difficulty_selector">
        <label>
            <input 
                onChange={(element) => 
                    props.handler.updateDifficulty(element.target.value)
                } 
                type="radio" name="difficulty" value="easy" id="easy"
            />
            easy
        </label>
        <label>
            <input 
                onChange={(element) => 
                    props.handler.updateDifficulty(element.target.value)
                } 
                type="radio" name="difficulty" value="normal" id="normal"
                checked
            />
            normal
        </label>
        <label>
            <input 
                onChange={(element) => 
                    props.handler.updateDifficulty(element.target.value)
                } 
                type="radio" name="difficulty" value="hard" id="hard"
            />
            hard
        </label>
    </div>
}

const Start = {
    handler: StartPageHandler,
    content: StartPageContentRoot,
    postRendering: () => {},
}
export default Start;
