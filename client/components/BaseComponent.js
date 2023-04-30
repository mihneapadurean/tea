import { formatUnicorn } from '../helpers/stringHelpers.js'
import { loadStylesheet } from '../helpers/loadHelpers.js';

export class BaseComponent extends HTMLElement{
    constructor() {
        super();
        this.componentName = this.constructor.name.replace(new RegExp('Component$'), '').toLowerCase();
    }

    async LoadComponentAsync(htmlArguments = {}, path = null) {
        this.attachShadow({ mode: 'open' });

        await loadStylesheet(`components/${this.componentName}/${this.componentName}.css`, this.shadowRoot);

        const htmlResponse = await fetch(`components/${path || this.componentName}/${this.componentName}.html`);
        const html = await htmlResponse.text();

        var template = document.createElement('template');
        template.innerHTML = formatUnicorn(html, htmlArguments);
        this.shadowRoot.append(...template.content.childNodes);
    }
}