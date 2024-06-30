import { CaravanActorSheet } from "./base.js";
import { Chat } from "../core/chat.js";
import { Rules } from "../core/rules.js";

export class PNJSheet extends CaravanActorSheet {

    /** 
     * @override
     */
	static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            width: 800,
            height: 300,
            resizable: false
      });
    }

    /**
     * @return the path of the specified actor sheet.
     */
    get template() {
        return 'systems/caravan/templates/actor/pnj.html';
    }

    /**
     * @override
     */
    activateListeners(html) {
        super.activateListeners(html);
        html.find('.action .fa-dice').click(this.onRollAction.bind(this));
    }

    /**
     * Roll the specified item.
     * @param event The click event.
     */
    async onRollAction(event) {

        event.preventDefault();
        const roll = await new Roll(this.actor.system.action + "kh").roll();
        const sentence = Rules.traitSentenceOf(roll.result);

        await new Chat(this.object)
            .withTemplate("systems/caravan/templates/chat/trait.hbs")
            .withData({
                actor: this.actor,
                result: roll.result,
                sentence: sentence
            })
            .withRoll(roll)
            .create();

    }

}