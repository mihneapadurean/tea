import { AuthenticationViewComponent } from "../Authentication/AuthenticationView/AuthenticationViewComponent.js";
import { BaseComponent } from "../BaseComponent.js";
import { HomeViewComponent } from "../HomeView/HomeViewComponent.js";

class AppComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        if(!localStorage.getItem("access_token")) {
            this.loadAuthenticationView();
            return;
        }

        this.loadHomeView();
    }

    loadAuthenticationView() {
        const authenticationView = new AuthenticationViewComponent();
        authenticationView.addEventListener("login-successful", () => {
            this.loadHomeView();
        });

        this.shadowRoot.replaceChildren(authenticationView);
    }

    loadHomeView() {
        console.log("here");
        const homeView = new HomeViewComponent();
        this.shadowRoot.replaceChildren(homeView);
    }
}

customElements.define('app-component', AppComponent);