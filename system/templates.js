export const preloadHandlebarsTemplates = async function () {

    // Define template paths to load
    const templatePaths = [
        // Character sheet
        "systems/custom/templates/actors/character-sheet.hbs",        
        
        // Character Tabs
        "systems/custom/templates/actors/tabs/characterTab.hbs",       
        "systems/custom/templates/actors/tabs/inventoryTab.hbs",           
        "systems/custom/templates/actors/tabs/capacitiesTab.hbs",              
        "systems/custom/templates/actors/tabs/aptitudesTab.hbs",          
        "systems/custom/templates/actors/tabs/equipmentTab.hbs",

        // NPC Sheet
        "systems/custom/templates/actors/npc-sheet.hbs",

        // Fragments
        "systems/custom/templates/actors/tabs/parts/statsSummary.hbs"
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};