import { BaseComponent } from "../BaseComponent.js";
import { isEmailValid } from "../../helpers/regexHelpers.js";
import { API_URL } from "../../constants.js";

class LoginComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        const submitButton = this.shadowRoot.querySelector(".btn-primary");
        const emailInput = this.shadowRoot.getElementById("email-input");
        const passwordInput = this.shadowRoot.getElementById("password-input");

        submitButton.onclick = async () => {
            let valid = true;
            const email = emailInput.value;
            const password = passwordInput.value;
            if(!email || !isEmailValid(email)) {
                emailInput.classList.add("invalid");
                valid = false;
            }

            if(!password) {
                passwordInput.classList.add("invalid");
                valid = false;
            }

            if(!valid)
            {
                return;
            }

            await this.LoginAsync(email, password);
        };

        emailInput.oninput = () => {
            if(emailInput.value) [
                emailInput.classList.remove("invalid")
            ]
        }
        emailInput.onblur = () => {
            if(!isEmailValid(emailInput.value)) {
                emailInput.classList.add("invalid");
            } else {
                emailInput.classList.remove("invalid");
            }
        }

        passwordInput.oninput = () => {
            if(passwordInput.value) [
                passwordInput.classList.remove("invalid")
            ]
        }
        passwordInput.onblur = () => {
            if(!passwordInput.value) {
                passwordInput.classList.add("invalid");
            } else {
                passwordInput.classList.remove("invalid");
            }
        }
    }

    async LoginAsync(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        if(!response.ok) {
            var errorSpan = this.shadowRoot.querySelector(".error");
            errorSpan.style.display = "block";
            errorSpan.textContent = "Invalid email or password";
            return;
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
    }
}

customElements.define('login-form', LoginComponent);