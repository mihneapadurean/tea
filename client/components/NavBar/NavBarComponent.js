import { BaseComponent } from "../BaseComponent.js";

class NavBarComponent extends BaseComponent {
    constructor() {
        super();
        fetch('http://localhost:8000/tea').then(response => response.json()).then(json => console.log(json));
    }

    async connectedCallback() {
        await this.LoadComponentAsync();
    }
}

customElements.define('nav-bar', NavBarComponent);