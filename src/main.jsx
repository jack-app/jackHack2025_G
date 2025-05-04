import { h, Fragment } from 'start-dom-jsx' // JSXを使うためのおまじない
import './index.css'

import { GameSetUp } from './messengers.js'
import Start from './start_page/main.jsx'

import Game from './game_page/main.jsx'

import Result from './result_page/main.jsx'
import PopUpWindowManager from './game_page/popup_window_manager.js'
import PopUpWindowFactory from './game_page/popup_window_factory.js'

class App {
  constructor(rootElement) {
    this.root = rootElement
  }

  render(component) {
    this.root.replaceChildren(component)
  }

  async launchMainLoop() {
    let game_result;
    let game_setup = new GameSetUp()
    while(true) { // メインループ
      // スタートページ
      game_setup = await this.showStartPage(game_setup)
      // ゲームページ
      game_result = await this.runGame(game_setup)
      // 結果ページ
      await this.showResultPage(game_setup, game_result)
    }
  }

  async showStartPage(game_setup) {
    const start_page_handler = new Start.handler(game_setup)
    this.render(Start.content({ handler: start_page_handler }))

    await start_page_handler.waitForGameStart()
    return start_page_handler.gameSetup
  }

  async runGame(game_setup) {
    const game_page_handler = new Game.handler(game_setup)
    const game_page_content = Game.content({ handler: game_page_handler })
    this.render(game_page_content)

    const popup_window_manager = game_page_handler.popUpWindowManager
    popup_window_manager.addWindowCountListener((count) => {
      if (count > game_setup.maxWindowCount) {
        game_page_handler.endGame()
      }
    })
    popup_window_manager.addScoreUpListener(() => {
      game_page_handler.gameResult.score += 1
    })

    popup_window_manager.start()
    await game_page_handler.waitForGameEnd()
    popup_window_manager.stop()
    return game_page_handler.gameResult
  }

  async showResultPage(game_setup, game_result) {
    const result_page_handler = new Result.handler(game_result, game_setup)
    this.render(Result.content({ handler: result_page_handler }))

    await result_page_handler.waitForComfirmation()
  }
}

const rootElement = document.getElementById('root')
const app = new App(rootElement)

app.launchMainLoop()
