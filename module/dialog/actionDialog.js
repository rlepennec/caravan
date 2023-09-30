import { Chat } from "../core/chat.js";

export class ActionDialog extends FormApplication {

    /**
     * Constructor.
     * @param actor The emiter of the dialog.
     */
    constructor(actor) {
        super(actor);
        this.dice = "d6";
        this.dices = this.object.system.action;
    }

    /**
     * @returns the default options to manage the dialog.
     */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["caravan", "sheet"],
            template: "systems/caravan/templates/dialog/action.hbs",
            width: 500,
            height: 246,
            choices: {},
            allowCustom: true,
            minimum: 0,
            maximum: null,
            closeOnSubmit: false
        });
    }

    /**
     * @returns the number of default dices.
     */
    defaultDices() {
        return this.object.system.masque === "" ? 1 : 2;
    }

    /**
     * @override
     */
    getData(options) {
        return Object.create({
            actor: this.object
        });
    }

    /**
     * @override
     */
    activateListeners(html) {
        super.activateListeners(html);
        html.find("#dice").click(this.onRoll.bind(this));
    }

    /**
     * Handle the click.
     * @param event The event to handle.
     */
    async onRoll(event) {

        event.preventDefault();
        const roll = await new Roll(this.dices + this.dice + "kh").roll({async: true});
        const sentence = this.sentenceOf(roll.result);

        await new Chat(this.object)
            .withTemplate("systems/caravan/templates/chat/action.hbs")
            .withData({
                actor: this.object,
                result: roll.result,
                sentence: sentence
            })
            .withRoll(roll)
            .create();

        await this.close();

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