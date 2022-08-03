import { dhsActor } from "./actors/actor.js";
import { dhsCharacterSheet } from "./actors/character-sheet.js";
import { dhsNpcSheet } from "./actors/npc-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";

Hooks.once("setup", function(){

    CONFIG.Actor.documentClass = dhsActor;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);

    // Register actor sheets
    Actors.registerSheet("dhs-jdr", dhsCharacterSheet, {
        types: ["character"],
        makeDefault: true,
        //label: "COF.sheet.character"
        label:"Personnage"
    });

    Actors.registerSheet("dhs-jdr", dhsNpcSheet, {
        types: ["npc"],
        makeDefault: true,
        //label: "COF.sheet.character"
        label:"PNJ"
    });    

    preloadHandlebarsTemplates(); 

    Handlebars.registerHelper('formatNumber', function (val) {
        if (isNaN(val) || +val === 0) return null;
        else return parseFloat(val).toFixed(0);
    });
});