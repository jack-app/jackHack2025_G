import { useState } from "react";
import "./main.css"
import windows_logo from "./windows.jpg" 
import "./user-select-area.css"
import button_image from "./button-dummy.png"

function StartPage(props) {
    const [difficulty, setDifficulty] = useState("normal")
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
                        <input onChange={(element) => props.handler.userNameUpdate(element.target.value)}/>
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
                        onChange={(element) => {
                            props.handler.difficultyUpdate(element.target.value)
                            setDifficulty(element.target.value)
                        }} 
                        type="radio" name="difficulty" value="easy" id="easy"
                        checked={difficulty === "easy"}
                    />
                    easy
                </label>
                <label>
                    <input 
                        onChange={(element) => {
                            props.handler.difficultyUpdate(element.target.value)
                            setDifficulty(element.target.value)
                        }} 
                        type="radio" name="difficulty" value="normal" id="normal"
                        checked={difficulty === "normal"}
                    />
                    normal
                </label>
                <label>
                    <input 
                        onChange={(element) => {
                            props.handler.difficultyUpdate(element.target.value)
                            setDifficulty(element.target.value)
                        }} 
                        type="radio" name="difficulty" value="hard" id="hard"
                        checked={difficulty === "hard"}
                    />
                    hard
                </label>
            </div>
        </div>   
    </div>
}
export default StartPage;