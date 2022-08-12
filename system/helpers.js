export function registerHelpers(){
    
    Handlebars.registerHelper('formatNumber', function (val) {
        if (isNaN(val) || +val === 0) return null;
        else return parseFloat(val).toFixed(0);
    });

    Handlebars.registerHelper('formatTextarea', function (val) {
        if (val === undefined || val === null || val.length === '') return val;
        else return val.replaceAll('\n','&#13;&#10;');
    });

    Handlebars.registerHelper('armorLabel', function (key, armorPart) {
        return game.i18n.localize(key+armorPart);        
    });   
}