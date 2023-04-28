class NavigationBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="header">
            <a href="#default" class="logo">
                <img src="assets/tea-logo.png"></img>
            </a>

            <div class="content-left">
                <a href="#home">Home</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>

            <div class="content-right">
                <a href="#logout">Logout</a>
            </div>
        </div>`;
    }
}

customElements.define('navigation-bar', NavigationBar);