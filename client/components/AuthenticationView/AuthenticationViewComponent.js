import { BaseComponent } from "../BaseComponent.js";
import { LoginComponent } from "../Login/LoginComponent.js";
import { RegisterComponent } from "../Register/RegisterComponent.js"

export class AuthenticationViewComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        this.switchToLogin();
    }

    switchToLogin() {
        const loginForm = new LoginComponent();
        loginForm.addEventListener("create-account-clicked", () => {
            this.switchToRegister();
        });

        this.shadowRoot.replaceChildren(loginForm);
    }

    switchToRegister() {
        const registerForm = new RegisterComponent();
        registerForm.addEventListener("login-instead-clicked", () => {
            this.switchToLogin();
        });

        this.shadowRoot.replaceChildren(registerForm);
    }
}

customElements.define('authentication-component', AuthenticationViewComponent);