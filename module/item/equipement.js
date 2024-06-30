import { CaravanItemSheet } from "./base.js";

export class EquipementSheet extends CaravanItemSheet {

    /** 
     * @override
     */
	static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            width: 700,
            height: 220,
            resizable: false
      });
    }

}