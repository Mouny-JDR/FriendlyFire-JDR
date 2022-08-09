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
        
        html.find('.addConsumable').click(ev => {
            this._addInventoryItem('consumables');
        });

        html.find('.deleteConsumable').click(ev => {
            let index = $(ev.currentTarget)?.data("index");
            this._deleteInventoryItem('consumables', index);
        });

        html.find('.addItem').click(ev => {
            this._addInventoryItem('items');
        });

        html.find('.deleteItem').click(ev => {            
            let index = $(ev.currentTarget)?.data("index");
            this._deleteInventoryItem('items', index);
        });

    }

    _addInventoryItem(key) {
        let items = Array.isArray(this.actor.data.data.inventory[key]) ? duplicate(this.actor.data.data.inventory[key]) : [];
        items.push({});
        this.actor.update({[`data.inventory.${key}`]: items});        
    }

    _deleteInventoryItem(key, index) {
        if (!isNaN(+index)) {
            let items = duplicate(this.actor.data.data.inventory[key]);
            items.splice(index, 1);
            this.actor.update({[`data.inventory.${key}`]: items});
        }
    }

    _getSubmitData(updateData={}) {
        const fd = new FormDataExtended(this.form, {editors: this.editors});
        let data = foundry.utils.expandObject(fd.toObject());
        if ( updateData ) foundry.utils.mergeObject(data, updateData);
        data.data.inventory.consumables = Array.from(Object.values(data.data.inventory.consumables || {}));
        data.data.inventory.items = Array.from(Object.values(data.data.inventory.items || {}));
        return data;
      }    
}