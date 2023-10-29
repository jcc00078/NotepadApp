const botonGuardar = document.querySelector("#bGuardar");
const inputDescripcion = document.querySelector("#descripcion");
const inputTitulo = document.querySelector("#titulo");
const notesContainer = document.querySelector("#notes-container");

function clearData() {
  inputTitulo.value = "";
  inputDescripcion.value = "";
}
function createNote(title, description) {
  const body = {
    title: title,
    description: description,
    isVisible: true,
  };
  fetch("https://localhost:7269/api/Notes", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((response) => {
      clearData();
      getAllNotes();
    });
}

function displayNotes(notes) {
  var allNotes = "";
  notes.forEach((note) => {
    const noteElement = `
    <div class="note">
          <h3>${note.title}</h3>
          <p>
            ${note.description}
          </p>
        </div>
    `;
    allNotes += noteElement;
  });
  notesContainer.innerHTML = allNotes;
}

function getAllNotes() {
  fetch("https://localhost:7269/api/Notes", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((response) => displayNotes(response));
}

getAllNotes();

botonGuardar.addEventListener("click", function () {
  createNote(inputTitulo.value, inputDescripcion.value);
});
