export class CaravanItemSheet extends ItemSheet {

    /**
     * @return the path of the specified item sheet.
     */
    get template() {
        return `systems/caravan/templates/item/${this.item.type}.html`;
    }

}