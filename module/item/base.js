const { HandlebarsApplicationMixin } = foundry.applications.api;

export class CaravanItemSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {

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
        context.item = this.item;
        context.system = this.item.system;
        return context;
    }

}
