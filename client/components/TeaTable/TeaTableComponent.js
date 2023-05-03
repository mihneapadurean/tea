import { BaseComponent } from "../BaseComponent.js";

class TeaTableComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        const addTeaModal = this.shadowRoot.getElementById('add-tea-modal');

        const addTeaButton = this.shadowRoot.getElementById('add-tea-button');
        addTeaButton.onclick = () => addTeaModal.style.display = "block";

        const closeSpan = this.shadowRoot.getElementById('close-span');
        closeSpan.onclick = () => addTeaModal.style.display = "none";

        const tea1 = {
            name: "Earl Grey",
            type: "Tea",
            caffeine: true,
            rating: 4,
            description: "Earl Grey tea is a tea blend which has been flavoured with the addition of oil of bergamot."
        };
          
        const tea2 = {
            name: "Chamomile",
            type: "Tea",
            caffeine: false,
            rating: 5,
            description: "Chamomile tea is a herbal infusion made from dried chamomile flowers and hot water."
        };
          
        const tea3 = {
            name: "Matcha",
            type: "Tea",
            caffeine: true,
            rating: 3,
            description: "Matcha is a finely ground powder made from shade-grown tea leaves. It is traditionally used in Japanese tea ceremonies."
        };
        this.teas = [tea1, tea2, tea3];

        this.addRow(tea1);
        this.addRow(tea2);
        this.addRow(tea3);
    }

    addRow(tea) {
        const table = this.shadowRoot.getElementById('tea-table');
        const numberOfRows = table.rows.length;

        const row = table.insertRow(numberOfRows);

        const name = row.insertCell(0);
        const type = row.insertCell(1);
        const caffeine = row.insertCell(2);
        const rating = row.insertCell(3);
        const description = row.insertCell(4);
        const editButtonCell = row.insertCell(5);
        const deleteButtonCell = row.insertCell(6);

        name.innerHTML = tea.name;
        type.innerHTML = tea.type;
        caffeine.innerHTML = tea.caffeine;
        rating.innerHTML = '&#11088;'.repeat(tea.rating);
        description.innerHTML = tea.description;

        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = () => this.editRow(numberOfRows - 1);
        editButtonCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => this.deleteRow(numberOfRows - 1);
        deleteButtonCell.appendChild(deleteButton);
    }

    editRow(rowNumber) {
        console.log(this.teas[rowNumber]);
    }

    deleteRow(rowNumber) {
        console.log(this.teas[rowNumber]);
    }
}

customElements.define('tea-table', TeaTableComponent);