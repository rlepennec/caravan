import { CaravanActorSheet } from "./base.js";

export class ChuchoteurSheet extends CaravanActorSheet {

    /** 
     * @override
     */
	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 800,
            height: 800,
            resizable: false
      });
    }

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
        html.find('.trait .open').click(this.onOpenTrait.bind(this));
        html.find('.equipement .delete').click(this.onDeleteEquipement.bind(this));
        html.find('.equipement .open').click(this.onOpenEquipement.bind(this));
        html.find('.masque .delete').click(this.onDeleteMasque.bind(this));
        html.find('.masque .voie').change(this.onSetVoie.bind(this));
        html.find('.masque .open').click(this.onOpenMasque.bind(this));
        html.find('.masque .fa-masks-theater').click(this.onSelectMasque.bind(this));
        
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

    /**
     * Delete the specified equipement.
     * @param event The click event.
     */
    async onDeleteEquipement(event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest(".equipement").data("id");
        const item = this.actor.items.get(id);
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
    }

    /**
     * Delete the specified masque.
     * @param event The click event.
     */
    async onDeleteMasque(event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest(".masque").data("id");
        const item = this.actor.items.get(id);
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
    }

    /**
     * Set the specified voie.
     * @param event The click event.
     */
    async onSetVoie(event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest(".masque").data("id");
        const voie = $(event.currentTarget).closest(".voie").data("voie");
        const item = this.actor.items.get(id);
        const value = $(event.currentTarget).closest(".voie").val();
        await item.update({ ['system.voie.' + voie + '.niveau']: parseInt(value) });
    }

    /**
     * Open the specified masque.
     * @param event The click event.
     * @returns the instance.
     */
    async onOpenMasque(event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest(".masque").data("id");
        const item = this.actor.items.get(id);
        if (item != null) {
            item.sheet.render(true);
        }
        return this;
    }

    /**
     * Open the specified trait.
     * @param event The click event.
     * @returns the instance.
     */
    async onOpenTrait(event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest(".trait").data("id");
        const item = this.actor.items.get(id);
        if (item != null) {
            item.sheet.render(true);
        }
        return this;
    }

    /**
     * Open the specified equipement.
     * @param event The click event.
     * @returns the instance.
     */
    async onOpenEquipement(event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest(".equipement").data("id");
        const item = this.actor.items.get(id);
        if (item != null) {
            item.sheet.render(true);
        }
        return this;
    }

    /**
     * Select the specified masque.
     * @param event The click event.
     * @returns the instance.
     */
    async onSelectMasque(event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest(".masque").data("id");
        const item = this.actor.items.get(id);
        if (item != null) {
            await this.actor.update({ ['system.masque']: (this.actor.system.masque === item.id ? "" : item.id) });
        }
        return this;
    }

}