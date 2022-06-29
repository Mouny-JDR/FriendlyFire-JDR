export class CustomActorSheet extends ActorSheet{
    
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["characterSheet"],
            template: "/systems/custom/templates/actors/character-sheet.hbs",
            width: 863,
            height: 1129,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "character" }],
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }]
        });
    }

}