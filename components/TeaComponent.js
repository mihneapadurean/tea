class TeaItemComponent extends HTMLElement {
    static get observedAttributes() {
      return ['name', 'type', 'infusionTime', 'purchaseDate', 'rating', 'description'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
      const name = this.attributes.name.value;
      const type = this.attributes.type.value;
      const infusionTime = this.attributes.infusionTime.value;
      const purchaseDate = new Date(this.attributes.purchaseDate.value);
      const rating = this.attributes.rating.value;
      const description = this.attributes.description.value;

      const starEmoji = '&#11088;';

      this.innerHTML = `
      <article>
        <header>
          <h2>${name} - ${type} tea</h2>
          <div>Infusion time: <b>${infusionTime} mins</b></div>
          <div>Purchase date: <b>${purchaseDate.toDateString()}</b></div>
          <div>Rating: ${starEmoji.repeat(rating)} </div>
        </header>

        <p>
          Description: <br/>
          ${description}
        </p>
      </article>`;
    }

    get testProp() {
      return this.testProp;
    }

    set testProp(value) {
      this.setAttribute('testProp', value);
    }
}

customElements.define('tea-item-component', TeaItemComponent);