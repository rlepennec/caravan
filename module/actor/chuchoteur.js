import { CaravanActorSheet } from "./base.js";

export class ChuchoteurSheet extends CaravanActorSheet {

    /**
     * @return the path of the specified actor sheet.
     */
    get template() {
        return 'systems/caravan/templates/actor/chuchoteur.html';
    }


}