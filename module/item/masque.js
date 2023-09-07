import { CaravanItemSheet } from "./base.js";

export class MasqueSheet extends CaravanItemSheet {

    /** 
     * @override
     */
	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 500,
            height: 700,
            resizable: true
      });
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('.voie .pouvoir .description').keydown(this.autosize.bind(html.find('.voie .pouvoir .description')));
    }
            
    autosize (el) {
      setTimeout(function(){
        el.currentTarget.style.cssText = 'height:auto; padding:0';
        el.currentTarget.style.cssText = 'height:' + el.currentTarget.scrollHeight + 'px';
      },0);
    }

}