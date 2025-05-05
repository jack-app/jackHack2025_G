import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない

export class SkillBase {
    constructor(name) { // skill_item = skillのICONなるDOM
        this.name = name;
    }

    onClick() {
        // ! override this
        throw new Error("onClick() not implemented in SkillBase");
    }

    get dom() {
        throw new Error("SkillItemDom() not implemented in SkillBase");
    }
}

export function SkillItem({children, onClick}) {
    return <div class="skill-item" onClick={onClick}>
        {children}
    </div>
}
