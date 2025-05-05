export class GameSetUp {
    constructor(){
        this.username = "";
        this.difficulty = "normal";
    }

    get maxWindowCount() {
        switch (this.difficulty) {
            case "easy":
                return 30;
            case "normal":
                return 40;
            case "hard":
                return 50;
            default:
                return 30;
        }
    }
    get minitialPopupInterval() {
        switch (this.difficulty) {
            case "easy":
                return 3000;
            case "normal":
                return 2000;
            case "hard":
                return 1000;
            default:
                return 1500;
        }
    }
}
export class GameResult {
    constructor(){
        this.score = 0;
    }   
}