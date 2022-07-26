export class dhsNpcSheet extends ActorSheet{
    
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["npcSheet"],
            template: "/systems/custom/templates/actors/npc-sheet.hbs",
            width: 647,
            height: 855,
            resizable: false
        });
    }
}