import { CaravanItemSheet } from "./base.js";

export class MasqueSheet extends CaravanItemSheet {

    /** 
     * @override
     */
	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 820,
            height: 880,
            resizable: true
      });
    }

}