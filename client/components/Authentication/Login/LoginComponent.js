import { API_URL } from "../../../helpers/constants.js";
import { BaseComponent } from "../../BaseComponent.js";

export class LoginComponent extends BaseComponent {
    
    constructor() {
        super('components/Authentication');
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        this.emailInput = this.shadowRoot.getElementById("email-input");
        this.passwordInput = this.shadowRoot.getElementById("password-input");
    }

    async loginAsync() {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ 
                email: this.emailInput.value, 
                password: this.passwordInput.value
            })
        });

        if(!response.ok) {
            var errorSpan = this.shadowRoot.getElementById("login-error-span");
            errorSpan.style.display = "block";
            errorSpan.textContent = "Invalid email or password";
            return;
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("role", data.role);
        this.dispatchEvent(new CustomEvent("login-successful", { bubbles: true, composed: true }));
    }
}

customElements.define('login-form', LoginComponent);