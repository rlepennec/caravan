import { Chat } from "../core/chat.js";
import { Rules } from "../core/rules.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class MystiqueDialog extends HandlebarsApplicationMixin(ApplicationV2) {

    /**
     * Constructor.
     * @param actor The emiter of the dialog.
     */
    constructor(actor) {
        super();
        this.actor = actor;
    }

    /**
     * @override
     */
    static DEFAULT_OPTIONS = {
        classes: ["caravan", "sheet", "themed", "theme-light"],
        position: {
            width: 500,
            height: 246
        },
        window: {
            title: "Jet de mystique"
        },
        actions: {
            roll: MystiqueDialog._onRoll
        }
    }

    /**
     * @override
     */
    static PARTS = {
        main: {
            template: "systems/caravan/templates/dialog/mystique.hbs"
        }
    }

    /**
     * @returns the number of dices to roll.
     */
    get dices() {
        return parseInt(this.element.querySelector("#dices")?.value ?? 1);
    }

    /**
     * @override
     */
    async _prepareContext(options) {
        return {
            actor: this.actor
        };
    }

    /**
     * Handle the click.
     * @param event The event to handle.
     */
    static async _onRoll(event) {

        event.preventDefault();

        if (this.actor.masque == null) {
            return;
        }

        let sentence = "2";

        // Roll and point lost
        const roll = await new Roll(this.dices + "d6kh").roll();
        if (roll.total >= this.actor.system.mystique && this.actor.system.mystique > 0) {
            await this.actor.update({ ['system.mystique']: this.actor.system.mystique - 1 });
            sentence = this.actor.system.mystique === 0 ? "0" : "1";
        }

        // Mask lost
        if (this.actor.system.mystique === 0) {
            await this.actor.update({ ['system.masque']: "" });
        }

        await new Chat(this.actor)
            .withTemplate("systems/caravan/templates/chat/mystique.hbs")
            .withData({
                actor: this.actor,
                result: roll.result,
                sentence: Rules.mystiqueSentenceOf(sentence)
            })
            .withRoll(roll)
            .create();

        await this.close();

    }

}
