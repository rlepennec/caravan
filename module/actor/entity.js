export class CaravanActor extends Actor {


    /**
     * @return the image depending on the selected mask.
     */
    get image() {
        if (this.system.masque === "") {
            return this.img;
        } else {
            const item = this.items.find(i => i.id === this.system.masque);
            return item.system.img;
        }
    }

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

    /**
     * @returns true if the chuchoteur have a mask.
     */
    get canUseMystique() {
        return this.system.masque !== "" && this.system.mystique > 0;
    }

}