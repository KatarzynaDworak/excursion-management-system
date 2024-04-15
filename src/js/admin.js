import './../css/admin.css';
import { ExcursionsAPI } from './ExcursionsAPI';

const api = new ExcursionsAPI();
builtExcursionsAdminUi();

// api.getExcursionAdmin();
Init()

function Init() {
    document.querySelector("form").addEventListener("submit", (e) => {
      this.addNewExcursion(e);
    });
    //FORMULARZ EDYCJI (który się otwiera)
    document.querySelector(".edit").addEventListener("submit", (e) => {
      editExcursionAdmin(e);
    });
  }

async function builtExcursionsAdminUi() {
    const excursionsApi = new ExcursionsAPI();
    const excursions = await excursionsApi.createExcursionAdminPanel();

    excursions.forEach((excursion) => {

        const li = document.createElement("li");
        li.className = "excursions__item";

        const header = document.createElement("header");
        const title = document.createElement("h2");
        title.className = "excursions__title";
        title.textContent = excursion.Title;
        
        const description = document.createElement("p");
        description.className = "excursions__description";
        description.textContent = excursion.Description;
        header.appendChild(title);
        header.appendChild(description);

        const form = document.createElement("form");
        form.className = "excursions__form";

        const adultField = document.createElement("div");
        adultField.className = "excursions__field";
        adultField.innerHTML = `
                    <label class="excursions__field-name">
                        Dorosły: <b>${excursion.Adult_cost}</b>PLN
                    </label>
                `;

        const childField = document.createElement("div");
        childField.className = "excursions__field";
        childField.innerHTML = `
                    <label class="excursions__field-name">
                        Dziecko: <b>${excursion.Child_cost}</b>PLN
                    </label>
                `;

        const submitField = document.createElement("div");
        submitField.className = "excursions__field excursions__field--submit";

        const editButton = document.createElement("input");
        editButton.className =
          "excursions__field-input excursions__field-input--edit";
        editButton.value = "edytuj";
        editButton.type = "button";
        editButton.addEventListener("click", (e) =>
          openEditPanel(e, excursion.id)
        );

        submitField.appendChild(editButton);

        const deleteButton = document.createElement("input");
        deleteButton.className =
          "excursions__field-input excursions__field-input--remove";
        deleteButton.value = "usuń";
        deleteButton.type = "button";
        deleteButton.onclick = () => deleteExcursion(excursion.id);

        submitField.appendChild(deleteButton);

        form.appendChild(adultField);
        form.appendChild(childField);
        form.appendChild(submitField);

        li.appendChild(header);
        li.appendChild(form);

        document.querySelector(".excursions").appendChild(li);
      });

}

async function deleteExcursion() {
    const excursionsApi = new ExcursionsAPI();
    const response = await excursionsApi.deleteExcursionAdminPanel();

    const excursions = await response.json();
    console.log("Excursion deleted:", excursions);

    document.querySelector(".excursions").innerHTML = "";
    this.builtExcursionsAdminUi();
} 

//DZIAŁA
function openEditPanel(e, id) {
    e.preventDefault();
    const panel = document.querySelector(".panel");
    panel.classList.add("disabledPanel");

    const edit_panel = document.querySelector(".edit_panel");
    edit_panel.style.display = "block";
    edit_panel.setAttribute("id", id);
}

async function editExcursionAdmin(e) {
    e.preventDefault();
    const edit_panel = document.querySelector(".edit_panel");
    let id = edit_panel.id;
    console.log(id, edit_panel);

    let content = document.querySelectorAll(`.edit`);
    console.log(content);

    const formData = {
        Title: content[0][0].value,
        Description: content[0][1].value,
        Adult_cost: content[0][2].value,
        Child_cost: content[0][3].value,
    };

    const excursionsApi = new ExcursionsAPI();  
    const response = await excursionsApi.editExcursion(id);
    const newExcursion = response.json();
    console.log("excursion edited:", newExcursion);

    document.querySelector(".excursions").innerHTML = "";
    builtExcursionsAdminUi();

    const panel = document.querySelector(".panel");
    panel.classList.remove("disabledPanel");
    document.querySelector(".edit_panel").style.display = "none";
    }
