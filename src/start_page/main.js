import { GameSetUp } from "../messengers"

export class StartPageHandler {
    constructor(gameSetup) {
        this.gameSetup = gameSetup ?? new GameSetUp()
        this.watingGameStart = []
        this.username = ""
        this.difficulty="normal"
    }

    waitForGameStart() {
        // resolveが呼ばれるまで待機する．resolveはstartGameが呼ばれたときに呼ばれる
        return new Promise((resolve) => {
            this.watingGameStart.push(resolve)
        })
    }

    startGame() {
        this.watingGameStart.forEach((resolve) => resolve())
        this.watingGameStart = []
    }

    userNameUpdate(username) {
         this.username=username
    }

    difficultyUpdate(difficulty) {
        this.difficulty = difficulty
   }
}