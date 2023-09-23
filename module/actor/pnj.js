import { CaravanActorSheet } from "./base.js";

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
        html.find('.action .fa-dice').click(this.onRollTrait.bind(this));
    }

    /**
     * Roll the specified item.
     * @param event The click event.
     */
    async onRollTrait(event) {
        event.preventDefault();
        console.log("Roll trait");
    }

}