import { Chat } from "../core/chat.js";

export class MystiqueDialog extends FormApplication {

    /**
     * Constructor.
     * @param actor The emiter of the dialog.
     */
    constructor(actor) {
        super(actor);
        this.dices = 1;
    }

    /**
     * @returns the default options to manage the dialog.
     */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["caravan", "sheet"],
            template: "systems/caravan/templates/dialog/mystique.hbs",
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
     * @override
     */
    getData(options) {
        return Object.create({
            actor: this.object,
            sentence: "toto"
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
        this.dices = parseInt(this.form?.querySelector("#dices")?.value);
    }

    /**
     * Handle the click.
     * @param event The event to handle.
     */
    async onRoll(event) {

        event.preventDefault();

        if (this.object.system.masque == "") {
            return;
        }

        let sentence = null;

        const roll = await new Roll(this.dices + "d6kh").roll({async: true});
        if (roll.result >= this.object.system.mystique && this.object.system.mystique > 0) {
            await this.object.update({ ['system.mystique']: this.object.system.mystique - 1 });
            if (this.object.system.mystique === 0) {
                await this.object.update({ ['system.masque']: "" });
                sentence = "perds son dernier point de mystique et son masque";
            } else {
                sentence = "perds un point de mystique";
            }
        } else {
            sentence = "parvient à garder ses points de mystique";
        }

        await new Chat(this.object)
            .withTemplate("systems/caravan/templates/chat/mystique.hbs")
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