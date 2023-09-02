export class CaravanActorSheet extends ActorSheet {

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
    getData() {
       return super.getData();
    }

}