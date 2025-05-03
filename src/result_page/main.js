import { GameResult } from "../messengers";

export class ResultPageHandler {
    constructor(gameResult) {
        this.gameResult = gameResult;
        this.watingGameComfirmation = [];
    }

    waitForComfirmation() {
        // resolveが呼ばれるまで待機する．resolveはconfirmResultが呼ばれたときに呼ばれる
        return new Promise((resolve) => {
            this.watingGameComfirmation.push(resolve);
        });
    }

    confirmResult() {
        this.watingGameComfirmation.forEach((resolve) => resolve());
        this.watingGameComfirmation = [];
    }
}