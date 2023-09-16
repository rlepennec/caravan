export class CaravanActor extends Actor {

    /**
     * @returns the traits. 
     */
    get traits() {
        return this.items.filter(i => i.type === 'trait');
    }

}