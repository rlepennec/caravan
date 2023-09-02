import { CaravanItem } from "./module/item/entity.js";
import { CaravanActor } from "./module/actor/entity.js";
import { ChuchoteurSheet } from "./module/actor/chuchoteur.js";
import { MasqueSheet } from "./module/item/masque.js";
import { PNJSheet } from "./module/actor/pnj.js";
import { PouvoirSheet } from "./module/item/pouvoir.js";

Hooks.once("init", function () {
    console.log("Caravan | Initializing Caravan System");

    CONFIG.Actor.documentClass = CaravanActor;
    CONFIG.Item.documentClass = CaravanItem;
    
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("caravan", ChuchoteurSheet, { types: ["chuchoteur"], makeDefault: true, label: "TYPES.Actor.chuchoteur" });
    Actors.registerSheet("caravan", PNJSheet, { types: ["pnj"], makeDefault: true, label: "TYPES.Actor.pnj" });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet('caravan', MasqueSheet, { types: ['masque'], makeDefault: true });
    Items.registerSheet('caravan', PouvoirSheet, { types: ['pouvoir'], makeDefault: true });

    loadTemplates([
        
    ]);

});