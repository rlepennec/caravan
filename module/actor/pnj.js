import { CaravanActorSheet } from "./base.js";
import { Chat } from "../core/chat.js";
import { Rules } from "../core/rules.js";

export class PNJSheet extends CaravanActorSheet {

    /**
     * @override
     */
    static DEFAULT_OPTIONS = {
        position: {
            width: 800,
            height: 300
        },
        actions: {
            rollAction: PNJSheet._onRollAction
        }
    }

    /**
     * @override
     */
    static PARTS = {
        main: {
            template: 'systems/caravan/templates/actor/pnj.html'
        }
    }

    /**
     * Roll the action of the pnj.
     * @param event The click event.
     */
    static async _onRollAction(event) {

        event.preventDefault();
        const roll = await new Roll(this.actor.system.action + "kh").roll();
        const sentence = Rules.traitSentenceOf(roll.result);

        await new Chat(this.actor)
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
