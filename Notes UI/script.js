const botonGuardar = document.querySelector("#bGuardar");
const inputDescripcion = document.querySelector("#descripcion");
const inputTitulo = document.querySelector("#titulo");
const notesContainer = document.querySelector("#notes-container");
const botonBorrar = document.querySelector("#bBorrar");

function rellenarFormulario(id) {
  getNoteById(id);
}
function displayNoteInForm(note) {
  inputTitulo.value = note.title;
  inputDescripcion.value = note.description;
  botonBorrar.classList.remove("hidden");
  botonBorrar.setAttribute("data-id", note.id);
  botonGuardar.setAttribute("data-id", note.id);
}
function getNoteById(id) {
  fetch(`https://localhost:7269/api/Notes/${id}`, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((response) => displayNoteInForm(response));
}

function clearData() {
  inputTitulo.value = "";
  inputDescripcion.value = "";
  botonBorrar.classList.add("hidden");
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
      botonGuardar.removeAttribute("data-id");
    });
}

function displayNotes(notes) {
  var allNotes = "";
  notes.forEach((note) => {
    const noteElement = `
    <div class="note" data-id=${note.id}>
          <h3>${note.title}</h3>
          <p>
            ${note.description}
          </p>
        </div>
    `;
    allNotes += noteElement;
  });
  notesContainer.innerHTML = allNotes;

  document.querySelectorAll(".note").forEach((note) => {
    note.addEventListener("click", function () {
      rellenarFormulario(note.dataset.id);
    });
  });
}

function getAllNotes() {
  fetch("https://localhost:7269/api/Notes", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((response) => displayNotes(response));
}

getAllNotes();

function updateNote(id, title, description) {
  const body = {
    title: title,
    description: description,
    isVisible: true,
  };
  fetch(`https://localhost:7269/api/Notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((response) => {
      clearData();
      getAllNotes();
      botonGuardar.removeAttribute("data-id");
    });
}

botonGuardar.addEventListener("click", function () {
  const id = botonGuardar.dataset.id;
  //Si ya existe el id, actualizo la nota (no creo una nueva)
  if (id) {
    updateNote(id, inputTitulo.value, inputDescripcion.value);
  } else {
    createNote(inputTitulo.value, inputDescripcion.value);
  }
});

function deleteNote(id) {
  fetch(`https://localhost:7269/api/Notes/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    clearData();
    getAllNotes();
    botonBorrar.removeAttribute("data-id");
  });
}

botonBorrar.addEventListener("click", function () {
  const id = botonBorrar.dataset.id;
  deleteNote(id);
});
