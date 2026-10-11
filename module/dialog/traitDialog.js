import { Chat } from "../core/chat.js";
import { Rules } from "../core/rules.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class TraitDialog extends HandlebarsApplicationMixin(ApplicationV2) {

    /**
     * Constructor.
     * @param actor The emiter of the dialog.
     */
    constructor(actor) {
        super();
        this.actor = actor;
        this.dice = this.actor.masque == null ? "d4" : "d6";
    }

    /**
     * @override
     */
    static DEFAULT_OPTIONS = {
        classes: ["caravan", "sheet", "themed", "theme-light"],
        position: {
            width: 500,
            height: 280
        },
        window: {
            title: "Jet de trait"
        },
        actions: {
            roll: TraitDialog._onRoll
        }
    }

    /**
     * @override
     */
    static PARTS = {
        main: {
            template: "systems/caravan/templates/dialog/trait.hbs"
        }
    }

    /**
     * @returns the number of default dices.
     */
    defaultDices() {
        return this.actor.masque == null ? 1 : 2;
    }

    /**
     * @returns the number of dices to roll, one more if a trait is used and one more if advantaged.
     */
    get dices() {
        const trait = this.element.querySelector("#dices")?.checked ? 1 : 0;
        const avantage = this.element.querySelector("#avantages")?.checked ? 1 : 0;
        return this.defaultDices() + trait + avantage;
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
        const roll = await new Roll(this.dices + this.dice + "kh").roll();
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

        await this.close();

    }

}
