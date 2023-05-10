import { formatUnicorn } from '../helpers/stringHelpers.js'

export class BaseComponent extends HTMLElement{
    constructor(componentPath = null) {
        super();
        this.componentPath = componentPath || "components";
        this.componentName = this.constructor.name.replace(new RegExp('Component$'), '').toLowerCase();
    }

    async LoadComponentAsync(htmlArguments = {}) {
        this.attachShadow({ mode: 'open' });

        const cssResponse = await fetch(`${this.componentPath}/${this.componentName}/${this.componentName}.css`);
        if(cssResponse.ok) {
            const style = document.createElement('style');
            style.textContent = await cssResponse.text();
            this.shadowRoot.append(style);
        }

        const htmlResponse = await fetch(`${this.componentPath}/${this.componentName}/${this.componentName}.html`);
        if(htmlResponse.ok) {
            const html = await htmlResponse.text();

            var template = document.createElement('template');
            template.innerHTML = formatUnicorn(html, htmlArguments);
            this.shadowRoot.append(...template.content.childNodes);
        };
    }
}