import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import "./main.css"
import windows_logo from "./windows.jpg" 
import "./user-select-area.css"
import button_image from "./button-dummy.png"

export function content(props) {
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
                <div className="user-select-area">
                    <div className="display-box">
                        <div className="user-icon"></div>
                        <div className="letters">
                            <p>Player</p>
                            <p>ユーザー名の入力</p>
                        </div>
                    </div>
                    <div className="input-box">
                        <input onChange={(element) => props.handler.updateUserName(element.target.value)}/>
                        <img src={button_image} onClick={() => props.handler.startGame()}/>
                    </div>
                </div>
            </div>
        </div>

        <div id="start-body-bottom-line"></div>

        <div id="start-footer">
            <div id="difficulty_selector">
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
        </div>   
    </div>
}