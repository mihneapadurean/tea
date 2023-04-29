import { BaseComponent } from "../BaseComponent.js";

class TeaItemComponent extends BaseComponent {
    static get observedAttributes() {
      return ['name', 'type', 'infusionTime', 'purchaseDate', 'rating', 'description'];
    }

    constructor() {
        super();
    }

    async connectedCallback() {
      const name = this.attributes.name.value;
      const type = this.attributes.type.value;
      const infusionTime = this.attributes.infusionTime.value;
      const purchaseDate = new Date(this.attributes.purchaseDate.value).toDateString();
      const rating = this.attributes.rating.value;
      const description = this.attributes.description.value;

      const starEmoji = '&#11088;';
      const starRating = starEmoji.repeat(rating)

      await this.LoadComponentAsync({ name, type, infusionTime, purchaseDate, starRating, description });
    }
}

customElements.define('tea-item', TeaItemComponent);