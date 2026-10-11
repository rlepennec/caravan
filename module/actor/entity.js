export class CaravanActor extends Actor {


    /**
     * @return the image depending on the selected mask.
     */
    get image() {
        return this.masque?.system.img ?? this.img;
    }

    /**
     * @returns the selected masque or undefined if none.
     */
    get masque() {
        return this.system.masque === "" ? undefined : this.items.get(this.system.masque);
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
        return this.masque != null && this.system.mystique > 0;
    }

}