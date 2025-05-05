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
}
export class GameResult {
    constructor(){
        this.score = 0;
    }   
}