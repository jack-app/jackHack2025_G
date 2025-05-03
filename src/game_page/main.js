import { GameSetUp, GameResult } from "../messengers";

export class GamePageHandler {
    constructor(gameSetup) {
        this.gameSetup = gameSetup ?? new GameSetUp();
        this.gameResult = new GameResult();
        this.watingGameEnd = [];
    }

    waitForGameEnd() {
        // resolveが呼ばれるまで待機する．resolveはendGameが呼ばれたときに呼ばれる
        return new Promise((resolve) => {
            this.watingGameEnd.push(resolve);
        });
    }

    endGame() {
        this.watingGameEnd.forEach((resolve) => resolve());
        this.watingGameEnd = [];
    }
}