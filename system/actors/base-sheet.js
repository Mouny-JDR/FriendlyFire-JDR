export class dhsBaseSheet extends ActorSheet{

    static get defaultOptions() {
        return super.defaultOptions;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.addItem').click(ev => {   
            let category = $(ev.currentTarget).closest("[data-category]")?.data("category");
            let type = $(ev.currentTarget)?.data("type");      

            if (category && type){
                let items = Array.isArray(this.actor.system[category][type]) ? duplicate(this.actor.system[category][type]) : [];
                items.push({});
                this.actor.update({[`system.${category}.${type}`]: items}); 
            }                  
        });

        html.find('.deleteItem').click(ev => {
            let category = $(ev.currentTarget).closest("[data-category]")?.data("category");
            let item = $(ev.currentTarget).closest(".item");
            let index = item?.data("index");
            let type = item?.data("type"); 

            if (!isNaN(+index) && category && type) {
                
                let items = duplicate(this.actor.system[category][type]);
                let item = items.splice(index, 1)[0];                    

                new Dialog({
                    title: game.i18n.localize("dhs-jdr.ui.dialog.deleteConfirmation.title"),
                    content: `<p>${game.i18n.localize("dhs-jdr.ui.dialog.deleteConfirmation.question")} ${game.i18n.localize(`dhs-jdr.ui.dialog.deleteConfirmation.type.${type}`)} : '${item.name ?? ''}' ?</p>`,
                    buttons: {
                        submit: {
                            icon: '<i class="fas fa-trash-alt"></i>',
                            label: game.i18n.localize("dhs-jdr.ui.dialog.deleteConfirmation.submit"),
                            callback: (html) => {
                                this.actor.update({[`system.${category}.${type}`]: items});                                
                            }
                        },		
                        cancel: {
                            icon: '<i class="fas fa-times"></i>',
                            label: game.i18n.localize("dhs-jdr.ui.dialog.cancel"),
                            callback: () => {
                            }
                        }
                    }
                },{classes:['deleteDialog'],width:'fit-content',height:'fit-content'}).render(true);                
            }
        });
    }    

    _getSubmitData(updateData={}) {
        const fd = new FormDataExtended(this.form, {editors: this.editors});
        let data = foundry.utils.expandObject(fd.object);
        let system = data.system;
        if ( updateData ) foundry.utils.mergeObject(data, updateData);

        if (system.inventory?.consumables) system.inventory.consumables = Array.from(Object.values(system.inventory.consumables || {}));
        if (system.inventory?.items) system.inventory.items = Array.from(Object.values(system.inventory.items || {}));
        if (system.inventory?.weapons) system.inventory.weapons = Array.from(Object.values(system.inventory.weapons || {}));
        if (system.inventory?.armors) system.inventory.armors = Array.from(Object.values(system.inventory.armors || {}));
        
        if (system.capacities?.activeCapacities) system.capacities.activeCapacities = Array.from(Object.values(system.capacities.activeCapacities || {}));
        if (system.capacities?.passiveCapacities) system.capacities.passiveCapacities = Array.from(Object.values(system.capacities.passiveCapacities || {}));

        if (system.aptitudes?.specializations) system.aptitudes.specializations = Array.from(Object.values(system.aptitudes.specializations || {}));
        if (system.aptitudes?.racialCapacities) system.aptitudes.racialCapacities = Array.from(Object.values(system.aptitudes.racialCapacities || {}));

        return data;
    }    
}