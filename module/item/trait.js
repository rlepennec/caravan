import { CaravanItemSheet } from "./base.js";

export class TraitSheet extends CaravanItemSheet {

    /** 
     * @override
     */
	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 700,
            height: 220,
            resizable: true
      });
    }

}