export class GameSetUp {
    constructor(){
        this.username = "";
        this.difficulty = "normal";
    }

    get maxWindowCount() {
        switch (this.difficulty) {
            case "easy":
                return 15;
            case "normal":
                return 10;
            case "hard":
                return 15;
            default:
                return 10;
        }
    }
}
export class GameResult {
    constructor(){
        this.score = 0;
    }   
}