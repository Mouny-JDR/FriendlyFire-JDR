export const preloadHandlebarsTemplates = async function () {

    // Define template paths to load
    const templatePaths = [
        // Character sheet
        "systems/dhs-jdr/templates/actors/character-sheet.hbs",        
        
        // Character Tabs
        "systems/dhs-jdr/templates/actors/tabs/characterTab.hbs",       
        "systems/dhs-jdr/templates/actors/tabs/inventoryTab.hbs",           
        "systems/dhs-jdr/templates/actors/tabs/capacitiesTab.hbs",              
        "systems/dhs-jdr/templates/actors/tabs/aptitudesTab.hbs",          
        "systems/dhs-jdr/templates/actors/tabs/equipmentTab.hbs",

        // NPC Sheet
        "systems/dhs-jdr/templates/actors/npc-sheet.hbs",

        // Fragments
        "systems/dhs-jdr/templates/actors/tabs/parts/character-statsSummary.hbs",
        "systems/dhs-jdr/templates/actors/tabs/parts/npc-statsSummary.hbs",
        "systems/dhs-jdr/templates/actors/tabs/parts/capacities.hbs",
        "systems/dhs-jdr/templates/actors/tabs/parts/weapons.hbs",        

        // Items
        "systems/dhs-jdr/templates/items/consumable.hbs",
        "systems/dhs-jdr/templates/items/item.hbs",
        "systems/dhs-jdr/templates/items/weapon.hbs",
        "systems/dhs-jdr/templates/items/armor.hbs",

        // Capacities
        "systems/dhs-jdr/templates/capacities/activeCapacity.hbs",
        "systems/dhs-jdr/templates/capacities/passiveCapacity.hbs",

        // Aptitudes
        "systems/dhs-jdr/templates/aptitudes/specialization.hbs",
        "systems/dhs-jdr/templates/aptitudes/racialCapacity.hbs",
        
        // Equipment
        "systems/dhs-jdr/templates/equipment/armor.hbs",
        "systems/dhs-jdr/templates/equipment/weapon.hbs",

        // Dialogs
        "systems/dhs-jdr/templates/dialogs/statRoll.hbs",

        "systems/dhs-jdr/templates/rolls/roll.hbs"
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};