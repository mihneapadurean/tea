import { BaseComponent } from "../../BaseComponent.js";
import { API_URL, defaultFetchOptions } from "../../../helpers/constants.js";

const teaTypesCaffeine = {
    "Black": ['Low', 'Medium', 'High'],
    "Green": ['Medium', 'High'],
    "White": ['None', 'Low'],
    "Oolong": ['None', 'Low'],
    "Herbal": ['None']
}

class TeaTableComponent extends BaseComponent {
    constructor() {
        super("components/Home");
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        this.table = this.shadowRoot.getElementById('tea-table');
        
        await this.loadTeas();

        this.setupSelects();
        this.setupSearchField();
        this.setupShowMore();
        this.setupColumnSorting();
    }

    async loadTeas() {
        const response = await fetch(`${API_URL}/teas`, defaultFetchOptions);
        if(!response.ok) {
            return;
        }

        const teas = await response.json();
        this.teas = teas;
        this.renderTable(this.teas);
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

        const response = await fetch(`${API_URL}/teas`, {
            ...defaultFetchOptions,
            method: "POST",
            body: JSON.stringify(tea)
        });

        if(!response.ok) {
            return;
        }

        const teaResponse = await response.json();
        console.log(teaResponse);

        this.teas.push(teaResponse);
        this.renderTable(this.teas);
        const searchInput = $(this.shadowRoot).find('#search-input');
        searchInput.keyup()

        this.closeModal("add-tea-modal");
    }

    async deleteTea(id) {
        console.log(defaultFetchOptions);
        const response = await fetch(`${API_URL}/teas?` + new URLSearchParams({ id }), {
            ...defaultFetchOptions,
            method: "DELETE"
        });

        if(!response.ok) {
            return;
        }


        this.teas = this.teas.filter(t => t.id !== id);
        this.renderTable(this.teas);

        const searchInput = $(this.shadowRoot).find('#search-input');
        searchInput.keyup()
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

    setupAdminButtons() {
        if(localStorage.getItem("role") === "admin") {
            return;
        }

        $(this.shadowRoot).find(".btn-admin").prop('disabled', true);
    }

    renderTable(displayedTeas){
        this.maxRows = this.maxRows === undefined ? 2 : this.maxRows;
        this.nameSorting = this.nameSorting === undefined ? 0 : this.nameSorting; //0 - no, 1 - asc, 2 - desc

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

        this.setupAdminButtons();
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
        deleteButton.classList.add('btn-danger', 'btn-admin');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => this.deleteTea(tea.id);
        deleteButtonCell.appendChild(deleteButton);
    }
}

customElements.define('tea-table', TeaTableComponent);