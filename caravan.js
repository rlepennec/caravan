import { CaravanItem } from "./module/item/entity.js";
import { CaravanActor } from "./module/actor/entity.js";
import { ChuchoteurSheet } from "./module/actor/chuchoteur.js";
import { EquipementSheet } from "./module/item/equipement.js";
import { MasqueSheet } from "./module/item/masque.js";
import { PNJSheet } from "./module/actor/pnj.js";
import { TraitSheet } from "./module/item/trait.js";
import { HandlebarsHelper } from "./module/core/handlebars.js";

Hooks.once("init", function () {
    console.log("Caravan | Initializing Caravan System");

    CONFIG.Actor.documentClass = CaravanActor;
    CONFIG.Item.documentClass = CaravanItem;

    const { Actors, Items } = foundry.documents.collections;

    Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
    Actors.registerSheet("caravan", ChuchoteurSheet, { types: ["chuchoteur"], makeDefault: true, label: "TYPES.Actor.chuchoteur" });
    Actors.registerSheet("caravan", PNJSheet, { types: ["pnj"], makeDefault: true, label: "TYPES.Actor.pnj" });

    Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
    Items.registerSheet('caravan', EquipementSheet, { types: ['equipement'], makeDefault: true, label: "TYPES.Item.equipement" });
    Items.registerSheet('caravan', MasqueSheet, { types: ['masque'], makeDefault: true, label: "TYPES.Item.masque" });
    Items.registerSheet('caravan', TraitSheet, { types: ['trait'], makeDefault: true, label: "TYPES.Item.trait" });

    Handlebars.registerHelper({
        html: HandlebarsHelper.html
    })

});
