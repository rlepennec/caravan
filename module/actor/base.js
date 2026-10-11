const { HandlebarsApplicationMixin } = foundry.applications.api;

export class CaravanActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {

    /**
     * The light theme is forced to keep the rendering of the v12 sheets.
     * @override
     */
    static DEFAULT_OPTIONS = {
        classes: ["caravan", "themed", "theme-light"],
        form: {
            submitOnChange: true,
            closeOnSubmit: false
        },
        window: {
            resizable: false
        }
    }

    /**
     * @override
     */
    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.actor = this.actor;
        context.system = this.actor.system;
        return context;
    }

}
