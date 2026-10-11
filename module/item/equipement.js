import { CaravanItemSheet } from "./base.js";

export class EquipementSheet extends CaravanItemSheet {

    /**
     * @override
     */
    static DEFAULT_OPTIONS = {
        position: {
            width: 700,
            height: 220
        }
    }

    /**
     * @override
     */
    static PARTS = {
        main: {
            template: 'systems/caravan/templates/item/equipement.html'
        }
    }

}
