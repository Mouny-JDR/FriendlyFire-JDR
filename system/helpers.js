export function registerHelpers(){
    
    Handlebars.registerHelper('formatNumber', function (val) {
        if (isNaN(val) || +val === 0) return null;
        else return parseFloat(val).toFixed(0);
    });
}