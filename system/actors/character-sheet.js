import { dhsBaseSheet } from "./base-sheet.js";

export class dhsCharacterSheet extends dhsBaseSheet{
    
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["characterSheet"],
            template: "/systems/dhs-jdr/templates/actors/character-sheet.hbs",
            width: 647,
            height: 855,            
            tabs: [{ navSelector: ".character-sheet-tabs", contentSelector: ".character-sheet-body", initial: "character" }],
            resizable: false
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.armor').children().click(ev => {
            ev.preventDefault();
            let target = $(ev.currentTarget)[0];
            let className = target.className;

            if (className === "leftGlove" || className === "rightGlove") {
                html.find('#equippedArmor #gloves')?.get()[0].scrollIntoView({behavior:'smooth', block: 'end'});
            }
            else {
                html.find(`#equippedArmor #${className}`)?.get()[0].scrollIntoView({behavior:'smooth', block: 'end'});
            }            
        });
    }
}