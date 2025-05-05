import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import "./difficulty_selector.css"

export default function DifficultySelector(props) {
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
