import { API_URL } from "../../constants.js";
import { BaseComponent } from "../BaseComponent.js";

export class RegisterComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        this.setupLoginButton();
        this.setupRegisterButton();

        this.setupBasicInputValidation("email-input");
        this.setupBasicInputValidation("name-input");
        this.setupBasicInputValidation("password-input");
        this.setupBasicInputValidation("password-confirm-input");
    }

    setupLoginButton() {
        const loginButton = this.shadowRoot.getElementById("login-button");
        loginButton.onclick = () => {
            this.dispatchEvent(new CustomEvent("login-instead-clicked"));
        }
    }

    setupRegisterButton() {
        const registerButton = this.shadowRoot.getElementById("register-button");
        const emailInput = this.shadowRoot.getElementById("email-input");
        const nameInput = this.shadowRoot.getElementById("name-input")
        const passwordInput = this.shadowRoot.getElementById("password-input");

        registerButton.onclick = async () => {
            await this.registerAsync(emailInput.value, nameInput.value, passwordInput.value);
        }
    }

    async registerAsync(email, name, password) {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            body: JSON.stringify({ email, name, password })
        });

        if(!response.ok) {
            var errorSpan = this.shadowRoot.getElementById("register-error-span");
            errorSpan.style.display = "block";
            errorSpan.textContent = await response.text();
            return;
        }

        this.dispatchEvent(new CustomEvent("login-instead-clicked"));
    }

    setupBasicInputValidation(inputId) {
        const inputNode = this.shadowRoot.getElementById(inputId);
        inputNode.oninput = () => {
            if(inputNode.value) [
                inputNode.classList.remove("invalid")
            ]
        }
        inputNode.onblur = () => {
            if(!inputNode.value) {
                inputNode.classList.add("invalid");
            } else {
                inputNode.classList.remove("invalid");
            }
        }
    }
}

customElements.define('register-form', RegisterComponent);