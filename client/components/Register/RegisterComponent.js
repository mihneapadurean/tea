import { BaseComponent } from "../BaseComponent.js";

export class RegisterComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        this.setupLoginButton();
    }

    setupLoginButton() {
        const loginButton = this.shadowRoot.getElementById("login-button");
        loginButton.onclick = () => {
            this.dispatchEvent(new CustomEvent("login-instead-clicked"));
        }
    }

    setupBasicInputValidation(inputNode) {
        inputNode.oninput = () => {
            if(passwordInput.value) [
                passwordInput.classList.remove("invalid")
            ]
        }
        inputNode.onblur = () => {
            if(!passwordInput.value) {
                passwordInput.classList.add("invalid");
            } else {
                passwordInput.classList.remove("invalid");
            }
        }
    }
}

customElements.define('register-form', RegisterComponent);