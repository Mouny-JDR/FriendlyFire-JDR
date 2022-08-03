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
        "systems/dhs-jdr/templates/actors/tabs/parts/armor.hbs"      
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};