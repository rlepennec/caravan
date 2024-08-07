import { CaravanActorSheet } from "./base.js";
import { MystiqueDialog } from "../dialog/mystiqueDialog.js";
import { TraitDialog } from "../dialog/traitDialog.js";

export class ChuchoteurSheet extends CaravanActorSheet {

    /**
     * @constructor
     * @param  {...any} args
     */
    constructor(...args) {
        super(...args);
        this.image = this.actor.img;
        this.options.submitOnClose = false;
    }

    /** 
     * @override
     */
	static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            width: 800,
            height: 800,
            resizable: false
      });
    }

    /**
     * @override
     */
    _updateObject(event, formData) {
        formData["img"] = this.actor.img;
        super._updateObject(event, formData);
        this.render(true);
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
        html.find('.trait .delete').click(this.onDeleteItem.bind(this, 'trait'));
        html.find('.trait .open').click(this.onOpenItem.bind(this, 'trait'));
        html.find('.traits .fa-dice').click(this.onRollTrait.bind(this));
        html.find('.mystique .fa-dice').click(this.onRollMystique.bind(this));
        html.find('.equipement .delete').click(this.onDeleteItem.bind(this, 'equipement'));
        html.find('.equipement .open').click(this.onOpenItem.bind(this, 'equipement'));
        html.find('.masque .delete').click(this.onDeleteItem.bind(this, 'masque'));
        html.find('.masque .voie').change(this.onSetVoie.bind(this));
        html.find('.masque .open').click(this.onOpenItem.bind(this, 'masque'));
        html.find('.masque .fa-masks-theater').click(this.onSelectMasque.bind(this));
    }

    /**
     * Delete the specified item.
     * @param type  The type of item.
     * @param event The click event.
     */
    async onDeleteItem(type, event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest("." + type).data("id");
        const item = this.actor.items.get(id);
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
    }

    /**
     * Open the specified item.
     * @param type  The type of the item.
     * @param event The click event.
     */
    async onOpenItem(type, event) {
        event.preventDefault();
        const id = $(event.currentTarget).closest("." + type).data("id");
        const item = this.actor.items.get(id);
        if (item != null) {
            item.sheet.render(true);
        }
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

    /**
     * Roll the specified trait.
     * @param event The click event.
     */
    async onRollTrait(event) {
        event.preventDefault();
        new TraitDialog(this.actor).render(true);
    }

    /**
     * Roll the mystique level.
     * @param event The click event.
     */
    async onRollMystique(event) {
        event.preventDefault();
        new MystiqueDialog(this.actor).render(true);
    }

}