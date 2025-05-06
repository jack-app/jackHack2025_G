import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import './main.css';
import { GameState, resetPage } from '../state';
import audioFile from './erro.mp3';


function ResultPage() {
   const onClick = () => {
      console.log( "onClick" );
      GameState.dispatch( resetPage() );
   };
   const state = GameState.getState();
   console.log( state );
   const { user_name, score } = state.user;

   const color = Math.random() < 0.05 ? "rgb(250, 3, 3)" : "rgb(64, 28, 192)";

   const audio = new Audio( audioFile );
   audio.play();
   return <div id="resultbackground" backgroundColor={ color }>
      <br />
      <p> A problem has been detected and windows has been shut down to prevent damage to your computer
         <br /><br />
         <b>{ user_name }'s score:{ score }</b>
         <br /><br />
         If this is the first time you've seen error screen, restart your computer.
         If this screen appears again, follow these steps; </p>

      <p>Check to make sure any new hardware or software is properly installed.<br />
         If this is a new installation, ask your hardware or software manufacturer
         for any Windows updates you might need.</p>

      <p>If problems continue, disable or remove any newly installed hardware
         or software. Disable BIOS memory options such as caching or shadowing.<br />
         If you need to use Safe Mode to remove or disable components, restart
         your computer, press F8 to select Advanced Startup Options, and then
         select Safe Mode.</p>


      <p>Technical information:</p>

      <p>*** STOP: 0x0000007B (0xF741884C, 0xC0000034, 0x00000000, 0x00000000)</p>
      <p>Beginning dump of physical memory<br />
         Physical memory dump complete.<br />
         Contact your system administrator or technical support group for furtherassistance.</p>
      <div class="button-container">
         <button onClick={ onClick }>Restart</button>
      </div>
   </div>;
}

export default ResultPage;
