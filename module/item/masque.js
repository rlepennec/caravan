import { CaravanItemSheet } from "./base.js";

export class MasqueSheet extends CaravanItemSheet {

    /**
     * @override
     */
    static DEFAULT_OPTIONS = {
        position: {
            width: 1000,
            height: 880
        },
        window: {
            resizable: true
        }
    }

    /**
     * @override
     */
    static PARTS = {
        main: {
            template: 'systems/caravan/templates/item/masque.html'
        }
    }

    /**
     * @override
     */
    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.enrichedDescription = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
            this.item.system.description,
            {
                secrets: this.item.isOwner,
                relativeTo: this.item
            }
        );
        return context;
    }

}
