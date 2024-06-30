import { Chat } from "../core/chat.js";
import { Rules } from "../core/rules.js";

export class TraitDialog extends FormApplication {

    /**
     * Constructor.
     * @param actor The emiter of the dialog.
     */
    constructor(actor) {
        super(actor);
        this.dice = this.object.system.masque === "" ? "d4" : "d6";
        this.dices = this.defaultDices();
    }

    /**
     * @returns the default options to manage the dialog.
     */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["caravan", "sheet"],
            template: "systems/caravan/templates/dialog/trait.hbs",
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
        html.find("#dices").change(this.onSetDices.bind(this));
        html.find("#dice").click(this.onRoll.bind(this));
    }

    /**
     * Handle the dices change.
     * @param event The event to handle.
     */
    async onSetDices(event) {
        const selector = this.form?.querySelector("#dices");
        const bonus = selector.checked ? 1 : 0;
        this.dices = this.defaultDices() +  bonus;
    }

    /**
     * Handle the click.
     * @param event The event to handle.
     */
    async onRoll(event) {

        event.preventDefault();
        const roll = await new Roll(this.dices + this.dice + "kh").roll();
        const sentence = Rules.traitSentenceOf(roll.result);

        await new Chat(this.object)
            .withTemplate("systems/caravan/templates/chat/trait.hbs")
            .withData({
                actor: this.object,
                result: roll.result,
                sentence: sentence
            })
            .withRoll(roll)
            .create();

        await this.close();

    }

}