export class TraitDialog extends FormApplication {

    /**
     * Constructor.
     * @param actor The emiter of the dialog.
     */
    constructor(actor) {
        super(actor);
    }

    /**
     * @returns the default options to manage the dialog.
     */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["caravan", "sheet"],
            template: "systems/caravan/templates/dialog/trait.hbs",
            width: 500,
            height: "auto",
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

}