import { CaravanActorSheet } from "./base.js";
import { ActionDialog } from "../dialog/actionDialog.js";

export class PNJSheet extends CaravanActorSheet {

    /** 
     * @override
     */
	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 800,
            height: 300,
            resizable: false
      });
    }

    /**
     * @return the path of the specified actor sheet.
     */
    get template() {
        return 'systems/caravan/templates/actor/pnj.html';
    }

    /**
     * @override
     */
    activateListeners(html) {
        super.activateListeners(html);
        html.find('.action .fa-dice').click(this.onRollAction.bind(this));
    }

    /**
     * Roll the specified item.
     * @param event The click event.
     */
    async onRollAction(event) {
        event.preventDefault();
        new ActionDialog(this.actor).render(true);
    }

}