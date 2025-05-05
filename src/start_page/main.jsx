import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import "./main.css";
import windows_logo from "./windows.jpg";

import { GameSetUp } from "../messengers";
import UserSelectArea from './user_select_area';
import DifficultySelector from './difficulty_selector';

function StartPage() {
   return <div id="start-page-container">
      <div id="start-header"></div>

      <div id="start-body-up-line"></div>

      <div id="start-body">
         <div id="start-body-left">
            <img src={ windows_logo } id="windows-logo" alt="windows logo" />
            <p>explain</p>
         </div>
         <div id="start-body-middle-line"></div>
         <div id="start-body-right">
            <UserSelectArea />
         </div>
      </div>

      <div id="start-body-bottom-line"></div>

      <div id="start-footer">
         <DifficultySelector />
      </div>
   </div>;
}

export default StartPage;
