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
     * @override
     */
    /*
    getData() {
        const data = super.getData();
        mergeObject(data, {

            system: data.item.system,
            isGM: game.user.isGM,
            debug: game.settings.get('neph5e', 'debug')
        })
        return data;


        const base = super.getData();
        return {
            owner: this.actor.isOwner,
            editable: this.isEditable,
            isGM: game.user.isGM,
            actor: base.actor,
            system: base.actor.system,
        }
    }*/

    /**
     * @return the path of the specified item sheet.
     */
    get template() {
        return `systems/caravan/templates/item/${this.item.type}.html`;
    }

}