import { AuthenticationViewComponent } from "../Authentication/AuthenticationView/AuthenticationViewComponent.js";
import { BaseComponent } from "../BaseComponent.js";
import { HomeViewComponent } from "../Home/HomeView/HomeViewComponent.js";

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
        const homeView = new HomeViewComponent();
        homeView.addEventListener("logout-successful", () => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("role");
            this.loadAuthenticationView();
        });

        this.shadowRoot.replaceChildren(homeView);
    }
}

customElements.define('app-component', AppComponent);