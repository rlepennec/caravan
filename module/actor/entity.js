export class CaravanActor extends Actor {

    /**
     * @returns the traits. 
     */
    get traits() {
        return this.items.filter(i => i.type === 'trait');
    }

    /**
     * @returns the masques. 
     */
    get masques() {
        return this.items.filter(i => i.type === 'masque');
    }

    /**
     * @returns the equipements. 
     */
    get equipements() {
        return this.items.filter(i => i.type === 'equipement');
    }

}