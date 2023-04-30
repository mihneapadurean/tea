import { BaseComponent } from "../BaseComponent.js";

export class HomeViewComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();
    }
}

customElements.define('view-component', HomeViewComponent);