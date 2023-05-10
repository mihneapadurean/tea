import { BaseComponent } from "../../BaseComponent.js";

export class AuthenticationViewComponent extends BaseComponent {
    constructor() {
        super("components/Authentication");
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        this.loginForm = this.shadowRoot.getElementById("login-form");
        this.registerForm = this.shadowRoot.getElementById("register-form");

        this.loginForm.addEventListener("create-account-clicked", () => {
            this.loginForm.style.display = "none";
            this.registerForm.style.display = "block";
        });

        this.registerForm.addEventListener("login-instead-clicked", () => {
            this.loginForm.style.display = "block";
            this.registerForm.style.display = "none";
        });
    }
}

customElements.define('authentication-component', AuthenticationViewComponent);