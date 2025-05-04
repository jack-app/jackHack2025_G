import { framerate } from "./const";
import DefaultPopUp from "./popups/default_popup";
import MovingPopUp from "./popups/moving_popup";

const popupKinds = [
    DefaultPopUp,
    MovingPopUp
]

export default class PopUpWindowFactory {
    constructor(gemeSetup) {
        this.timer = 0;
    }

    randomChoicePopUp() {
        return popupKinds[Math.floor(Math.random() * popupKinds.length)]
    }

    arrayOfNewWindows(onScoreUp, elapsed) {
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 150);

        if (elapsed === null) {
            // ここは最初だけ実行される
            const newWindow = new DefaultPopUp(x, y, onScoreUp);
            return [newWindow];
        }

        this.timer += elapsed;
        if (this.timer < 1000) return []; // 5秒間は何も出さない

        const RandomPopup = this.randomChoicePopUp()
        const newWindow = new RandomPopup(x, y, onScoreUp);

        this.timer = 0; // reset the timer
        return [newWindow]; // return an array of windows
    }
}