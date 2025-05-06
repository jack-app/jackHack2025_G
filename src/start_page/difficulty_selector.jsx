import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import "./difficulty_selector.css";
import { EASY, HARD, NORMAL, setDifficulty, GameState} from '../state';

export default function DifficultySelector() {
   const onChange = ( element ) => {
      console.log( "onChange", element.target.value );
      GameState.dispatch(setDifficulty(Number(element.target.value) ));
   };
   return <div id="difficulty_selector">
      <input
         onChange={ onChange }
         type="radio" name="difficulty" value={ EASY } id="easy"
      />
      <label for="easy">
         easy
      </label>
      <input
         onChange={ onChange }
         type="radio" name="difficulty" value={ NORMAL } id="normal"
         checked
      />
      <label for="normal">
         normal
      </label>
      <input
         onChange={ onChange }
         type="radio" name="difficulty" value={ HARD } id="hard"
      />
      <label for="hard">
         hard
      </label>
   </div>;
}
