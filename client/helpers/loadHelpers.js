export function loadStylesheet(cssUrl, node) {
    return new Promise(function(resolve) {
        var link = document.createElement('link');
        link.rel  = 'stylesheet';
        link.href = cssUrl;

        node.appendChild(link)

        link.onload = function() { 
            resolve(); 
        };
    });
}