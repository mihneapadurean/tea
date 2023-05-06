import { BaseComponent } from "../BaseComponent.js";

class TeaTableComponent extends BaseComponent {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.LoadComponentAsync();

        this.table = this.shadowRoot.getElementById('tea-table');
        this.addTeaModal = this.shadowRoot.getElementById('add-tea-modal');

        this.addTeaButton = this.shadowRoot.getElementById('add-tea-button');
        this.addTeaButton.onclick = () => addTeaModal.style.display = "block";

        this.closeSpan = this.shadowRoot.getElementById('close-span');
        this.closeSpan.onclick = () => addTeaModal.style.display = "none";

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

        this.setupSearchField();
        this.setupShowMore();
        this.setupColumnSorting();
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
        console.log(nameColumn);
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
        const editButtonCell = row.insertCell(5);
        const deleteButtonCell = row.insertCell(6);

        name.innerHTML = tea.name;
        type.innerHTML = tea.type;
        caffeine.innerHTML = tea.caffeine;
        rating.innerHTML = '&#11088;'.repeat(tea.rating);
        description.innerHTML = tea.description;

        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = () => this.editTea(tea.id);
        editButtonCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => this.deleteTea(tea.id);
        deleteButtonCell.appendChild(deleteButton);
    }

    editTea(id) {
        console.log(id);
    }

    deleteTea(id) {
        console.log(id);
    }
}

customElements.define('tea-table', TeaTableComponent);