import { BaseComponent } from "../../BaseComponent.js";

export class HomeViewComponent extends BaseComponent {
    constructor() {
        super("components/Home");
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        const aboutPage = this.shadowRoot.getElementById("about-page");
        const teaTable = this.shadowRoot.getElementById("tea-table");

        const navbar = this.shadowRoot.getElementById("navbar");
        navbar.addEventListener("show-about", () => {
            aboutPage.style.display = "block";
            teaTable.style.display = "none";
        });

        navbar.addEventListener("show-tea-table", () => {
            aboutPage.style.display = "none";
            teaTable.style.display = "block";
        });
    }
}

customElements.define('home-view', HomeViewComponent);