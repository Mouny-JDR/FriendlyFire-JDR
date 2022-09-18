import { dhsBaseSheet } from "./base-sheet.js";
import { CustomDialog } from "../customDialog.js";

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
            let stat = target.attributes.getNamedItem("data-roll-stat").value;
            let statValue = !isNaN(this.actor.getRollData().attributes[stat]) ? +this.actor.getRollData().attributes[stat] : 0;            
            let title = `${game.i18n.localize('dhs-jdr.ui.dialog.roll')} ${game.i18n.localize(`dhs-jdr.ui.roll.prefix.${stat}`)}${game.i18n.localize(`dhs-jdr.ui.sheets.character.attributes.${stat}`)}`;

            let content = await renderTemplate('systems/dhs-jdr/templates/dialogs/statRoll.hbs',{title: title});
            new CustomDialog({
                title: title,
                content: content,
                buttons: {
                    submit: {
                        icon: '<div class="roll"></div>',
                        label: game.i18n.localize("dhs-jdr.ui.dialog.rollDice"),
                        callback: (html) => {                            
                            let selectedIndex = +html.find('.dices select')[0].selectedIndex;
                            let rollType = selectedIndex === 0 ? 'dhs-jdr.ui.roll.test' : 'dhs-jdr.ui.roll.confront';
                            let bonus = html.find('.bonus input')[0].value;
                            let difficulty = +html.find('.difficulty input')[0].value;
                            let hasDifficulty = !isNaN(difficulty) && +difficulty > 0;            

                            let rollFormula = "1d20";
                            
                            if (selectedIndex === 0) {
                                if (isNaN(difficulty) || difficulty < 0) {
                                    ui.notifications.warn(game.i18n.localize('dhs-jdr.ui.dialog.invalidDifficulty'));                                        
                                    return false;
                                }   
                            }
                            else {
                                rollFormula += `+${statValue}`; 
                            }

                            if (bonus.length > 0) rollFormula += ` + ${bonus}`;
                            this._rollStat({
                                title: title,
                                rollType: rollType,
                                hasDifficulty: selectedIndex === 0 ? hasDifficulty : false,
                                difficulty: difficulty,
                                stat: stat,
                                statValue: statValue,
                                rollFormula: rollFormula
                            });
                        }                  
                    },		
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: game.i18n.localize("dhs-jdr.ui.dialog.cancel")
                    }
                }
            },{classes:['rollForm'], width:'325', height:'fit-content'}).render(true);               
        });
    }

    async _rollStat(args){
        let roll = new Roll(args.rollFormula);

        try {            
            await roll.evaluate();
            
            let success = false;
            let criticalSuccess = false;
            let criticalFailure = false;        

            if (args.hasDifficulty) {
                let diceResult = roll.dice[0].total;
                let total = roll.total;

                success = total <= (+args.statValue - +args.difficulty);
                criticalSuccess = diceResult === 1;
                criticalFailure = diceResult === 20;
            }

            let statPrefix = game.i18n.localize(`dhs-jdr.ui.roll.prefix.${args.stat}`);
            let statLbl = game.i18n.localize(`dhs-jdr.ui.sheets.character.attributes.${args.stat}`);
            
            let template = await renderTemplate('systems/dhs-jdr/templates/rolls/roll.hbs',{title: args.title, rollType: args.rollType, statPrefix: statPrefix, statLbl: statLbl, hasDifficulty: args.hasDifficulty, difficulty: args.difficulty, success: success, criticalSuccess: criticalSuccess, criticalFailure: criticalFailure});
            roll.toMessage({flavor:template});
        }
        catch (err){
            ui.notifications.warn(game.i18n.localize('dhs-jdr.ui.roll.invalidRoll'));
        }                                                 
    }
}