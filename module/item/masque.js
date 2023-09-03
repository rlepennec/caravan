import { CaravanItemSheet } from "./base.js";

export class MasqueSheet extends CaravanItemSheet {

    /** 
     * @override
     */
	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 800,
            height: 700,
            resizable: true
      });
    }

}