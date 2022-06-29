export class CustomActorSheet extends ActorSheet{
    
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["characterSheet"],
            template: "/systems/custom/templates/actors/character-sheet.hbs",
            width: 647,
            height: 855,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "character" }],
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
            resizable: false
        });
    }

}