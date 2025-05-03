import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import StartPage from './start_page/main.jsx'
import GamePage from './game_page/main.jsx'
import ResultPage from './result_page/main.jsx'
import { StartPageHandler } from './start_page/main.js'
import { GamePageHandler } from './game_page/main.js'
import { GameSetUp } from './messengers.js'
import { ResultPageHandler } from './result_page/main.js'

class Game {
  constructor(rootElement) {
    this.root = createRoot(rootElement)
  }

  render(component) {
    this.root.render(<StrictMode>{component}</StrictMode>)
  }

  async launchMainLoop() {
    let game_setup = new GameSetUp()
    let start_page_handler;
    let game_page_handler;
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
      this.run(game_page_handler)
      await game_page_handler.waitForGameEnd()
      game_result = game_page_handler.gameResult

      // 結果ページ
      result_page_handler = new ResultPageHandler(game_result)
      this.render(<ResultPage handler={result_page_handler}/>)
      await result_page_handler.waitForComfirmation()
    }
  }

  async run(game_page_handler) {
    // ゲーム本体の実行
  }
}

const rootElement = document.getElementById('root')
const game = new Game(rootElement)

game.launchMainLoop()
