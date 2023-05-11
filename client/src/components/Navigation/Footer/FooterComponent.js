import { BaseComponent } from "../../BaseComponent.js";

class FooterComponent extends BaseComponent {
    constructor() {
        super("components/Navigation");
    }

    async connectedCallback() {
        await this.LoadComponentAsync();
    }
}

customElements.define('footer-component', FooterComponent);