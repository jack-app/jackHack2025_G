import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import './main.css';

export function postRendering() {
    const resultBg = document.getElementById("resultbackground");
    
    if (resultBg) {
        if (Math.random() < 0.05) {
            resultBg.style.backgroundColor = "rgb(250, 3, 3)";
        } else {
            resultBg.style.backgroundColor = "rgb(64, 28, 192)";
        }
    }
}

export function content(props) {

    const score = props.handler.gameResult.score
    const user_name = props.handler.gameSetup.username 
    const audio = new Audio('./src/result_page/erro.mp3')
    audio.play()

    return <div id="resultbackground">
    <br/>
    <p> A problem has been detected and windows has been shut down to prevent damage to your computer
    <br/><br/>
    <b>{user_name}'s score:{score}</b>
    <br/><br/>
    If this is the first time you've seen error screen, restart your computer. 
    If this screen appears again, follow these steps; </p>

    <p>Check to make sure any new hardware or software is properly installed.<br/>
    If this is a new installation, ask your hardware or software manufacturer
    for any Windows updates you might need.</p>

    <p>If problems continue, disable or remove any newly installed hardware
    or software. Disable BIOS memory options such as caching or shadowing.<br/>
    If you need to use Safe Mode to remove or disable components, restart
    your computer, press F8 to select Advanced Startup Options, and then
    select Safe Mode.</p>

    
    <p>Technical information:</p>
    
    <p>*** STOP: 0x0000007B (0xF741884C, 0xC0000034, 0x00000000, 0x00000000)</p>
    <p>Beginning dump of physical memory<br/>
    Physical memory dump complete.<br/>
    Contact your system administrator or technical support group for furtherassistance.</p>
        <button onClick={() => props.handler.confirmResult()}>Restart</button>
        
    </div>
}