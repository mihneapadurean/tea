import { BaseComponent } from "../BaseComponent.js";

class RegisterComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();
    }
}

customElements.define('register-form', RegisterComponent);