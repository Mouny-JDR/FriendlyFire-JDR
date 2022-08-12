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
                let items = Array.isArray(this.actor.data.data[category][type]) ? duplicate(this.actor.data.data[category][type]) : [];
                items.push({});
                this.actor.update({[`data.${category}.${type}`]: items}); 
            }                  
        });

        html.find('.deleteItem').click(ev => {
            let category = $(ev.currentTarget).closest("[data-category]")?.data("category");
            let item = $(ev.currentTarget).closest(".item");
            let index = item?.data("index");
            let type = item?.data("type"); 

            if (!isNaN(+index) && category && type) {
                let items = duplicate(this.actor.data.data[category][type]);
                items.splice(index, 1);
                this.actor.update({[`data.${category}.${type}`]: items});
            }
        });
    }    

    _getSubmitData(updateData={}) {
        const fd = new FormDataExtended(this.form, {editors: this.editors});
        let data = foundry.utils.expandObject(fd.toObject());
        if ( updateData ) foundry.utils.mergeObject(data, updateData);

        if (data.data.inventory?.consumables) data.data.inventory.consumables = Array.from(Object.values(data.data.inventory.consumables || {}));
        if (data.data.inventory?.items) data.data.inventory.items = Array.from(Object.values(data.data.inventory.items || {}));
        if (data.data.inventory?.weapons) data.data.inventory.weapons = Array.from(Object.values(data.data.inventory.weapons || {}));
        if (data.data.inventory?.armors) data.data.inventory.armors = Array.from(Object.values(data.data.inventory.armors || {}));
        
        if (data.data.capacities?.activeCapacities) data.data.capacities.activeCapacities = Array.from(Object.values(data.data.capacities.activeCapacities || {}));
        if (data.data.capacities?.passiveCapacities) data.data.capacities.passiveCapacities = Array.from(Object.values(data.data.capacities.passiveCapacities || {}));

        return data;
    }    
}