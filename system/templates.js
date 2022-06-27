export const preloadHandlebarsTemplates = async function () {

    // Define template paths to load
    const templatePaths = [
        // ACTOR
        "systems/custom/templates/actors/character-sheet.hbs",
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};