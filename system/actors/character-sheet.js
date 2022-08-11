export class dhsCharacterSheet extends ActorSheet{
    
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

        html.find('.addItem').click(ev => {   
            let type = $(ev.currentTarget)?.data("type");      

            if (type){
                let items = Array.isArray(this.actor.data.data.inventory[type]) ? duplicate(this.actor.data.data.inventory[type]) : [];
                items.push({});
                this.actor.update({[`data.inventory.${type}`]: items}); 
            }                  
        });

        html.find('.deleteItem').click(ev => {
            let item = $(ev.currentTarget).closest(".item");
            let index = item?.data("index");
            let type = item?.data("type"); 

            if (!isNaN(+index) && type) {
                let items = duplicate(this.actor.data.data.inventory[type]);
                items.splice(index, 1);
                this.actor.update({[`data.inventory.${type}`]: items});
            }
        });

        html.find('.addCapacity').click(ev => {   
            let type = $(ev.currentTarget)?.data("type");      

            if (type){
                let items = Array.isArray(this.actor.data.data.capacities[type]) ? duplicate(this.actor.data.data.capacities[type]) : [];
                items.push({});
                this.actor.update({[`data.capacities.${type}`]: items}); 
            }                  
        });

        html.find('.deleteCapacity').click(ev => {
            let item = $(ev.currentTarget).closest(".item");
            let index = item?.data("index");
            let type = item?.data("type"); 

            if (!isNaN(+index) && type) {
                let items = duplicate(this.actor.data.data.capacities[type]);
                items.splice(index, 1);
                this.actor.update({[`data.capacities.${type}`]: items});
            }
        });        
    }    

    _getSubmitData(updateData={}) {
        const fd = new FormDataExtended(this.form, {editors: this.editors});
        let data = foundry.utils.expandObject(fd.toObject());
        if ( updateData ) foundry.utils.mergeObject(data, updateData);

        data.data.inventory.consumables = Array.from(Object.values(data.data.inventory.consumables || {}));
        data.data.inventory.items = Array.from(Object.values(data.data.inventory.items || {}));
        data.data.inventory.weapons = Array.from(Object.values(data.data.inventory.weapons || {}));
        data.data.inventory.armors = Array.from(Object.values(data.data.inventory.armors || {}));
        
        data.data.capacities.activeCapacities = Array.from(Object.values(data.data.capacities.activeCapacities || {}));
        data.data.capacities.passiveCapacities = Array.from(Object.values(data.data.capacities.passiveCapacities || {}));

        return data;
      }    
}