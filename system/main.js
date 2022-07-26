import { dhsActor } from "./actors/actor.js";
import { dhsCharacterSheet } from "./actors/actor-sheet.js";
import { dhsNpcSheet } from "./actors/npc-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";

Hooks.once("setup", function(){

    CONFIG.Actor.documentClass = dhsActor;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);

    // Register actor sheets
    Actors.registerSheet("custom", dhsCharacterSheet, {
        types: ["character"],
        makeDefault: true,
        //label: "COF.sheet.character"
        label:"Personnage"
    });

    Actors.registerSheet("custom", dhsNpcSheet, {
        types: ["npc"],
        makeDefault: true,
        //label: "COF.sheet.character"
        label:"PNJ"
    });    

    preloadHandlebarsTemplates();
});