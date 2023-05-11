import { BaseComponent } from "../../BaseComponent.js";

class NavBarComponent extends BaseComponent {
    constructor() {
        super("components/Navigation");
    }

    async connectedCallback() {
        await this.LoadComponentAsync();
    }
}

customElements.define('nav-bar', NavBarComponent);