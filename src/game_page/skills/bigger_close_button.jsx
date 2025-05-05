import { h, Fragment } from 'start-dom-jsx'; // JSXを使うためのおまじない
import { SkillBase, SkillItem } from "./skill_base"

export default class BiggerCloseButtonSkill extends SkillBase {
     constructor() {
        super("BiggerCloseButton")
     }

     onClick() {
        console.log("BiggerCloseButton clicked")
     }

     get dom() {
        return <SkillItem onClick={this.onClick.bind(this)}>
            BIG
        </SkillItem>
    }

}