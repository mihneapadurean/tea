import { API_URL } from "../../../helpers/constants.js";
import { BaseComponent } from "../../BaseComponent.js";

export class RegisterComponent extends BaseComponent {
    constructor() {
        super('components/Authentication');
    }

    async connectedCallback() {
        await this.LoadComponentAsync();
    }

    async registerAsync() {
        const emailInput = this.shadowRoot.getElementById("email-input");
        const nameInput = this.shadowRoot.getElementById("name-input")
        const passwordInput = this.shadowRoot.getElementById("password-input");
        const confirmPasswordInput = this.shadowRoot.getElementById("confirm-password-input");

        console.log(passwordInput.value, confirmPasswordInput.value);

        if(passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("Passwords do not match");
            confirmPasswordInput.reportValidity();
            return;
        }

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            body: JSON.stringify({ 
                email: emailInput.value, 
                name: nameInput.value,
                password: passwordInput.value 
            })
        });

        if(!response.ok) {
            var errorSpan = this.shadowRoot.getElementById("register-error-span");
            errorSpan.style.display = "block";
            errorSpan.textContent = await response.text();
            return;
        }

        this.dispatchEvent(new CustomEvent("login-instead-clicked"));
    }
}

customElements.define('register-form', RegisterComponent);