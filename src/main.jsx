import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import './index.css'

import { content as StartPage } from './start_page/main.jsx'
import { StartPageHandler } from './start_page/main.js'

import GamePage from './game_page/main.jsx'
import { GamePageHandler } from './game_page/main.js'
import { GameSetUp } from './messengers.js'

import { content as ResultPage, postRendering as resultPostRendering } from './result_page/main.jsx'
import { ResultPageHandler } from './result_page/main.js'
import { PopUpWindowManager } from './game_page/popup_window_manager.js'

class Game {
  constructor(rootElement) {
    this.root = rootElement
  }

  render(component) {
    this.root.replaceChildren(component)
  }

  async launchMainLoop() {
    let game_setup = new GameSetUp()
    let start_page_handler;
    
    let game_page_handler;
    let popup_window_manager;
    let game_result;
    
    let result_page_handler;
    while(true) { // メインループ
      // スタートページ
      start_page_handler = new StartPageHandler(game_setup)
      this.render(<StartPage handler={start_page_handler}/>)
      await start_page_handler.waitForGameStart()
      game_setup = start_page_handler.gameSetup

      // ゲームページ
      game_page_handler = new GamePageHandler(game_setup)
      this.render(<GamePage handler={game_page_handler}/>)
      popup_window_manager = new PopUpWindowManager(game_setup)
      popup_window_manager.start()
      await game_page_handler.waitForGameEnd()
      popup_window_manager.stop()
      game_result = game_page_handler.gameResult

      // 結果ページ
      result_page_handler = new ResultPageHandler(game_result,game_setup)
      this.render(<ResultPage handler={result_page_handler}/>)
      resultPostRendering()
      await result_page_handler.waitForComfirmation()
    }
  }

  async run(game_page_handler) {
    game_page_handler.popupManager.start()
    // ゲーム本体の実行

  // const managerRef = useRef(null);
  // useEffect(() => {
  //   // Initialize and start the window manager with initial frame rates
  //   managerRef.current = new PopUpWindowManager({
  //     createFrameRate: 2000,
  //     updateFrameRate: 50,
  //     elementId: "game-window",
  //   });
  //   managerRef.current.start();

  //   return () => {
  //     // Cleanup when component unmounts
  //     if (managerRef.current) {
  //       managerRef.current.stop();
  //     }
  //   };
  // }, []);
  }
}

const rootElement = document.getElementById('root')
const game = new Game(rootElement)

game.launchMainLoop()
