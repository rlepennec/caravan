import { CaravanActorSheet } from "./base.js";

export class ChuchoteurSheet extends CaravanActorSheet {

    /**
     * @return the path of the specified actor sheet.
     */
    get template() {
        return 'systems/caravan/templates/actor/chuchoteur.html';
    }

    /**
     * @override
     */
    activateListeners(html) {
        super.activateListeners(html);
        html.find('.trait .delete').click(this.onDeleteTrait.bind(this));
    }

    /**
     * Delete the specified trait.
     * @param event The click event.
     */
    async onDeleteTrait(event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest(".trait").data("id");
        const item = this.actor.items.get(id);
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
    }

}