import { dhsBaseSheet } from "./base-sheet.js";

export class dhsNpcSheet extends dhsBaseSheet{
    
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["npcSheet"],
            template: "/systems/dhs-jdr/templates/actors/npc-sheet.hbs",
            width: 647,
            height: 855,
            resizable: false
        });
    }     
}