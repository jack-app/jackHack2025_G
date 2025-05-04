import { useState } from "react";
import "./main.css"
import "./user-select-area.css"
import button_image from "./button-dummy.png"

function StartPage(props) {
    const [difficulty, setDifficulty] = useState("normal")
    return <div id="start-page-container">
        <div id="start-header"></div>

        <div id="start-body-up-line"></div>

        <div id="start-body">
            <div id="start-body-left">
                <h1>windows x<br />explain</h1>
            </div>
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
                        type="radio" name="difficulty" value="easy"
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
                        type="radio" name="difficulty" value="normal"
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
                        type="radio" name="difficulty" value="hard"
                        checked={difficulty === "hard"}
                    />
                    hard
                </label>
            </div>
        </div>   
    </div>
}
export default StartPage;