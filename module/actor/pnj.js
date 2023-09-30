import { CaravanActorSheet } from "./base.js";
import { Chat } from "../core/chat.js";

export class PNJSheet extends CaravanActorSheet {

    /** 
     * @override
     */
	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
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
        const roll = await new Roll(this.actor.system.action + "kh").roll({async: true});
        const sentence = this.sentenceOf(roll.result);

        await new Chat(this.object)
            .withTemplate("systems/caravan/templates/chat/action.hbs")
            .withData({
                actor: this.actor,
                result: roll.result,
                sentence: sentence
            })
            .withRoll(roll)
            .create();

    }

    /**
     * @param result The roll result between 1 and 6.
     * @returns the result sentence.
     */
    sentenceOf(result) {
        switch (result) {
            case "1":
                return "C'est raté et vous devez payer le prox fort";
            case "2":
                return "C'est raté avec un petit revers";
            case "3":
                return "C'est raté de justesse ou réussi avec revers";
            case "4":
                return "C'est réussi de justesse";
            case "5":
                return "C'est réussi avec un peit effet bénéfique";
            case "6":
                return "C'est réussi brillamment";
                
        }
    }

}