import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import "./user_select_area.css";
import login_button_image from "./windows-矢印.png";
import info_button_image from "./windows-info.png";
import profil_picture from "./profil-pic.jpg";
import { GameState, setUserName, startGame } from '../state';

function GitHubLink( { username } ) {
   const anchor = document.createElement( "a" );
   anchor.href = `https://github.com/${ username.replace( /^@/, '' ) }`;
   anchor.target = "_blank";
   anchor.textContent = username;
   return anchor;
}


export default function UserSelectArea() {
   const onChange = ( element ) => {
      console.log( "onChange", element.target.value );
      GameState.dispatch( setUserName( element.target.value ) );
   };
   const onClick = () => {
      console.log( "onClick" );
      GameState.dispatch( startGame() );
   };
   const state = GameState.getState();
   const { user_name, score: _ } = state.user;

   return <div class="user-select-area">
      <div class="display-box">
         <div class="user-icon">
            <img src={ profil_picture } />
         </div>
         <div class="letters">
            <p>Player</p>
            <p>ユーザー名の入力</p>
         </div>
      </div>
      <div class="input-box">
         <input onChange={ onChange } value={ user_name } />
         <img src={ login_button_image } onClick={ onClick } />
         <div class="info-button">
            <img src={ info_button_image } />
            <div class="credit">
               <p> Credit Team G </p>
               <ul
                  class="credit-list">
                  <li> Enpitsu (<GitHubLink username={ '@nagoyayuu15' } />) </li>
                  <li> Wulfy (<GitHubLink username={ '@pewulfman' } />) </li>
                  <li> gla (<GitHubLink username={ '@gla-6910 ' } />)</li>
                  <li>  gata28 (<GitHubLink username={ '@gata2825' } />) </li>
                  <li>  masa (<GitHubLink username={ '@massa55in' } />) </li>
                  <li> Teshi-K(<GitHubLink username={ '@Teshi-K' } />) </li>
                  <li> potato </li>
               </ul>
            </div>
         </div>
      </div>
   </div >;
}
