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

        html.find('.roll').click(async (ev)=>{            
            ev.preventDefault();
            let target = $(ev.currentTarget)[0];
            let stat = target.attributes.getNamedItem("data-roll-stat").value
            let key = `dhs-jdr.ui.dialog.roll.${stat}`; 
            let title = `Test ${game.i18n.localize(key)}`;

            let content = await renderTemplate('systems/dhs-jdr/templates/dialogs/statRoll.hbs',{title: title});
            new Dialog({
                title: title,
                content: content,
                buttons: {
                    submit: {
                        icon: '<div class="roll"></div>',
                        label: game.i18n.localize("dhs-jdr.ui.dialog.roll.rollDice")                  
                    },		
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: game.i18n.localize("dhs-jdr.ui.dialog.cancel")
                    }
                }
            },{classes:['rollForm'], width:'325', height:'fit-content'}).render(true);               
        });
    }
}