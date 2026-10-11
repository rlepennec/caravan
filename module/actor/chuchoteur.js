import { CaravanActorSheet } from "./base.js";
import { MystiqueDialog } from "../dialog/mystiqueDialog.js";
import { TraitDialog } from "../dialog/traitDialog.js";

export class ChuchoteurSheet extends CaravanActorSheet {

    /**
     * @override
     */
    static DEFAULT_OPTIONS = {
        position: {
            width: 800,
            height: 800
        },
        actions: {
            deleteItem: ChuchoteurSheet._onDeleteItem,
            openItem: ChuchoteurSheet._onOpenItem,
            selectMasque: ChuchoteurSheet._onSelectMasque,
            rollTrait: ChuchoteurSheet._onRollTrait,
            rollMystique: ChuchoteurSheet._onRollMystique
        }
    }

    /**
     * @override
     */
    static PARTS = {
        main: {
            template: 'systems/caravan/templates/actor/chuchoteur.html'
        }
    }

    /**
     * The voie levels are not part of the actor form: they are saved on their masque.
     * @override
     */
    async _onRender(context, options) {
        await super._onRender(context, options);
        for (const input of this.element.querySelectorAll('.masque input[data-voie]')) {
            input.addEventListener('change', this._onSetVoie.bind(this));
        }
    }

    /**
     * @param target The clicked element.
     * @returns the embedded item of the row containing the target.
     */
    _itemOf(target) {
        const id = target.closest("[data-id]")?.dataset.id;
        return this.actor.items.get(id);
    }

    /**
     * Delete the specified item. The active masque is unselected first.
     * @param event  The click event.
     * @param target The clicked element.
     */
    static async _onDeleteItem(event, target) {
        event.preventDefault();
        const item = this._itemOf(target);
        if (item == null) {
            return;
        }
        if (this.actor.system.masque === item.id) {
            await this.actor.update({ ['system.masque']: "" });
        }
        await this.actor.deleteEmbeddedDocuments('Item', [item.id]);
    }

    /**
     * Open the specified item.
     * @param event  The click event.
     * @param target The clicked element.
     */
    static async _onOpenItem(event, target) {
        event.preventDefault();
        this._itemOf(target)?.sheet.render(true);
    }

    /**
     * Set the level of the specified voie.
     * @param event The change event.
     */
    async _onSetVoie(event) {
        event.preventDefault();
        event.stopPropagation();
        const input = event.currentTarget;
        const item = this._itemOf(input);
        const value = parseInt(input.value);
        if (item == null || isNaN(value)) {
            return;
        }
        await item.update({ ['system.voie.' + input.dataset.voie + '.niveau']: value });
    }

    /**
     * Select the specified masque.
     * @param event  The click event.
     * @param target The clicked element.
     */
    static async _onSelectMasque(event, target) {
        event.preventDefault();
        const item = this._itemOf(target);
        if (item != null) {
            await this.actor.update({ ['system.masque']: (this.actor.system.masque === item.id ? "" : item.id) });
        }
    }

    /**
     * Roll a trait.
     * @param event The click event.
     */
    static async _onRollTrait(event) {
        event.preventDefault();
        new TraitDialog(this.actor).render(true);
    }

    /**
     * Roll the mystique level.
     * @param event The click event.
     */
    static async _onRollMystique(event) {
        event.preventDefault();
        new MystiqueDialog(this.actor).render(true);
    }

}
