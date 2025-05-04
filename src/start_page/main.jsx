import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import "./main.css"
import windows_logo from "./windows.jpg"

import { GameSetUp } from "../messengers"
import UserSelectArea from './user_select_area'
import DifficultySelector from './difficulty_selector'

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

const Start = {
    handler: StartPageHandler,
    content: StartPageContentRoot,
    postRendering: () => {},
}
export default Start;
