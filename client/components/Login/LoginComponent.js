import { isEmailValid } from "../../helpers/regexHelpers.js";
import { API_URL } from "../../constants.js";
import { BaseComponent } from "../BaseComponent.js";

export class LoginComponent extends BaseComponent {
    
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        this.setupEmailInputValidation();
        this.setupPasswordInputValidation();
        this.setupLoginButton();
        this.setupCreateAccountButton();
    }

    setupEmailInputValidation() {
        const emailInput = this.shadowRoot.getElementById("email-input");
        const emailErrorSpan = this.shadowRoot.getElementById("email-error-span");

        this.emailValid = false;

        emailInput.oninput = () => {
            if(!isEmailValid(emailInput.value)) {
                emailInput.classList.add("invalid");
                this.emailValid = false;
            } else {
                emailInput.classList.remove("invalid");
                this.emailValid = true;
            }
        }

        emailInput.onblur = () => {
            if(!emailInput.value) {
                emailInput.classList.add("invalid");
                emailErrorSpan.style.display = "block";
                emailErrorSpan.textContent = "Please enter an email address.";
                return;
            }

            if(!isEmailValid(emailInput.value)) {
                emailInput.classList.add("invalid");
                emailErrorSpan.style.display = "block";
                emailErrorSpan.textContent = "Please enter a valid email address.";
                return;
            } 

            emailErrorSpan.style.display = "none";
        }
    }

    setupPasswordInputValidation() {
        const passwordInput = this.shadowRoot.getElementById("password-input");
        const passwordErrorSpan = this.shadowRoot.getElementById("password-error-span");

        this.passwordValid = false;

        passwordInput.oninput = () => {
            if(passwordInput.value) {
                passwordInput.classList.remove("invalid");
                this.passwordValid = true;
                return;
            }

            this.passwordValid = false;
        }
        passwordInput.onblur = () => {
            if(!passwordInput.value) {
                passwordInput.classList.add("invalid");
                passwordErrorSpan.style.display = "block";
                passwordErrorSpan.textContent = "Please enter a password.";
                return;
            }

            passwordErrorSpan.style.display = "none";
        }
    }

    setupLoginButton() {
        const submitButton = this.shadowRoot.getElementById("login-button");
        const emailInput = this.shadowRoot.getElementById("email-input");
        const passwordInput = this.shadowRoot.getElementById("password-input");

        submitButton.onclick = async () => {
            console.log(this.emailValid, this.passwordValid);
            if(!this.emailValid || !this.passwordValid) {
                return;
            }

            await this.LoginAsync(emailInput.value, passwordInput.value);
        };
    }

    setupCreateAccountButton() {
        const createAccountButton = this.shadowRoot.getElementById("create-account-button");
        createAccountButton.onclick = () => {
            this.dispatchEvent(new CustomEvent("create-account-clicked"));
        }
    }

    async LoginAsync(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        if(!response.ok) {
            var errorSpan = this.shadowRoot.getElementById("login-error-span");
            errorSpan.style.display = "block";
            errorSpan.textContent = "Invalid email or password";
            return;
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        this.dispatchEvent(new CustomEvent("login-successful", { bubbles: true, composed: true }));
    }
}

customElements.define('login-form', LoginComponent);