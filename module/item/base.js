export class CaravanItemSheet extends ItemSheet {

    /**
     * @constructor
     * @param {...any} args
     */
    constructor(...args) {
        super(...args);
        this.options.submitOnClose = true;
    }

    /**
     * @return the path of the specified item sheet.
     */
    get template() {
        return `systems/caravan/templates/item/${this.item.type}.html`;
    }

}