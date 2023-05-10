import { BaseComponent } from "../BaseComponent.js";

const teaTypesCaffeine = {
    "Black": ['Low', 'Medium', 'High'],
    "Green": ['Medium', 'High'],
    "White": ['None', 'Low'],
    "Oolong": ['None', 'Low'],
    "Herbal": ['None']
}

class TeaTableComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        this.table = this.shadowRoot.getElementById('tea-table');

        const tea1 = {
            id: 1,
            name: "Earl Grey",
            type: "Tea",
            caffeine: true,
            rating: 4,
            description: "Earl Grey tea is a tea blend which has been flavoured with the addition of oil of bergamot."
        };
          
        const tea2 = {
            id: 2,
            name: "Chamomile",
            type: "Tea",
            caffeine: false,
            rating: 5,
            description: "Chamomile tea is a herbal infusion made from dried chamomile flowers and hot water."
        };
          
        const tea3 = {
            id: 4,
            name: "Matcha",
            type: "Tea",
            caffeine: true,
            rating: 3,
            description: "Matcha is a finely ground powder made from shade-grown tea leaves. It is traditionally used in Japanese tea ceremonies."
        };
        this.teas = [tea1, tea2, tea3, tea1, tea1];

        this.maxRows = 2;
        this.nameSorting = 0; //0 - no, 1 - asc, 2 - desc
        this.renderTable(this.teas);

        this.setupSelects();
        this.setupSearchField();
        this.setupShowMore();
        this.setupColumnSorting();
    }

    async addTea() {
        const addTeaForm = this.shadowRoot.getElementById("add-tea-form");
        const formData = new FormData(addTeaForm);

        const tea = {
            name: formData.get("name"),
            type: formData.get("type"),
            caffeine: formData.get("caffeine"),
            rating: formData.get("rating"),
            description: formData.get("description")
        };

        await fetch()

        this.teas.push(tea);
        this.renderTable(this.teas);
        this.closeModal("add-tea-modal");
    }

    async deleteTea(id) {
        this.teas = this.teas.filter(t => t.id !== id);
        this.renderTable(this.teas);
    }

    showModal(modalId) {
        this.shadowRoot.getElementById(modalId).style.display = "block";
    }

    closeModal(modalId) {
        this.shadowRoot.getElementById(modalId).style.display = "none";

        const addTeaForm = this.shadowRoot.getElementById("add-tea-form");
        addTeaForm.reset();
    }

    setupSelects() {
        const typeSelect = $(this.shadowRoot).find("#type-select");
        typeSelect.append($('<option>', {
            value: '',
            text: 'Select Type'
        }));

        for(const type in teaTypesCaffeine) {
            typeSelect.append($('<option>', {
                value: type,
                text: type
            }));
        }

        typeSelect.change(() => { 
            const selectedType = typeSelect.val();
            const caffeineSelect = $(this.shadowRoot).find("#caffeine-select");

            caffeineSelect.empty();
            caffeineSelect.append($('<option>', {
                value: '',
                text: 'Select Caffeine'
            }));

            if(selectedType) {
                teaTypesCaffeine[selectedType].forEach(caffeine => {
                    caffeineSelect.append($('<option>', {
                        value: caffeine,
                        text: caffeine
                    }));
                });
            }
        })
    }

    setupShowMore() {
        const showMoreButton = this.shadowRoot.getElementById("show-more-button");

        this.showingMore = false;

        showMoreButton.onclick = () => {
            if(!this.showingMore) {
                this.maxRows = null;
                this.renderTable()

                this.showingMore = true;
                showMoreButton.textContent = "Show less";
            } else {
                this.maxRows = 2;
                this.renderTable();

                this.showingMore = false;
                showMoreButton.textContent = "Show more";
            }
        }
    }

    setupColumnSorting() {
        const nameColumn = $(this.shadowRoot).find('#name-column');

        nameColumn.click(() => {
            this.nameSorting = (this.nameSorting + 1) % 3;
            this.renderTable();

            nameColumn.removeClass();
            if(this.nameSorting === 1) {
                nameColumn.addClass('asc');
                return;
            }

            if(this.nameSorting === 2) {
                nameColumn.addClass('desc');
                return;
            }
        });
    }

    setupSearchField() {
        //JQuery
        const searchInput = $(this.shadowRoot).find('#search-input');
        searchInput.keyup(() => { 
            const searchKey = searchInput.val(); 
            if(searchKey.length < 3) {
                this.renderTable(this.teas);
                return;
            }

            this.renderTable(this.teas.filter(t => t.name.toLowerCase().startsWith(searchKey.toLowerCase())));
        });
    }

    renderTable(displayedTeas){
        if(displayedTeas) {
            this.displayedTeas = displayedTeas;
        }

        let visibleTeas = [...this.displayedTeas];

        if(this.nameSorting === 1) {
            visibleTeas = visibleTeas.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();

                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        }

        if(this.nameSorting === 2) {
            visibleTeas = visibleTeas.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();

                if (nameA < nameB) {
                    return 1;
                }
                if (nameA > nameB) {
                    return -1;
                }
                return 0;
            });
        }

        if(this.maxRows) {
            visibleTeas = visibleTeas.slice(0, this.maxRows);
        }
        
        $(this.table).find("tbody").empty();
        visibleTeas.forEach(tea => this.addRow(tea));
    }

    addRow(tea) {
        const tableBody = this.table.getElementsByTagName('tbody')[0];
        const numberOfRows = tableBody.rows.length;

        const row = tableBody.insertRow(numberOfRows);

        const name = row.insertCell(0);
        const type = row.insertCell(1);
        const caffeine = row.insertCell(2);
        const rating = row.insertCell(3);
        const description = row.insertCell(4);
        const deleteButtonCell = row.insertCell(5);

        name.innerHTML = tea.name;
        type.innerHTML = tea.type;
        caffeine.innerHTML = tea.caffeine;
        rating.innerHTML = '&#11088;'.repeat(tea.rating);
        description.innerHTML = tea.description;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => this.deleteTea(tea.id);
        deleteButtonCell.appendChild(deleteButton);
    }
}

customElements.define('tea-table', TeaTableComponent);