import { useState } from "react";
import "./main.css"

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
                <input onChange={(element) => props.handler.userNameUpdate(element.target.value)}></input>
                <button onClick={() => props.handler.startGame()}>Start Game</button>
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