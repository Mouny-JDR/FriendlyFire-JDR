import { CustomActor } from "./actors/actor.js";
import { CustomActorSheet } from "./actors/actor-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";

Hooks.once("setup", function(){

    CONFIG.Actor.documentClass = CustomActor;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);

    // Register actor sheets
    Actors.registerSheet("custom", CustomActorSheet, {
        types: ["character"],
        makeDefault: true,
        //label: "COF.sheet.character"
        label:"Personnage"
    });

    preloadHandlebarsTemplates();
});