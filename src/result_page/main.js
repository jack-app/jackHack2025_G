import { GameResult } from "../messengers";

export class ResultPageHandler {
    constructor(gameResult) {
        this.gameResult = gameResult;
        this.watingGameEnd = [];
    }

    waitForComfirmation() {
        // resolveが呼ばれるまで待機する．resolveはconfirmGameが呼ばれたときに呼ばれる
        return new Promise((resolve) => {
            this.watingGameComfirmation.push(resolve);
        });
    }

    confirmResult() {
        this.watingGameComfirmation.forEach((resolve) => resolve());
        this.watingGameComfirmation = [];
    }
}