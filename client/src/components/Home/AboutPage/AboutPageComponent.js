import { BaseComponent } from "../../BaseComponent.js";

class AboutPageComponent extends BaseComponent {
    constructor() {
        super("components/Home");
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        $(this.shadowRoot).find("#small-image").click(() => {
            $(this.shadowRoot).find("#show-image-popup").show();
        });

        $(this.shadowRoot).find("#close-span").click(() => {
            $(this.shadowRoot).find("#show-image-popup").hide();
        });
    }
}

customElements.define('about-page', AboutPageComponent);