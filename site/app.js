const details = {
  T: {
    title: "Maestro: Tiendas",
    description: "Datos maestros de tiendas que alimentan la base de datos de abastecimiento."
  },
  P: {
    title: "Maestro: Proveedores",
    description: "Datos maestros de proveedores que alimentan la base de datos de abastecimiento."
  },
  M: {
    title: "Maestro: Materiales",
    description: "Datos maestros de materiales que alimentan la base de datos de abastecimiento."
  },
  S: {
    title: "Inventario: Stock SCE",
    description: "El inventario alimenta la base de datos y también el cálculo de abastecimiento del Modelo YAS."
  },
  DB: {
    title: "Base de datos",
    description: "Concentra información de proveedores, materiales y tiendas. El diagrama indica que no hay integración directa con el cálculo YAS."
  },
  V: {
    title: "Parámetros: Variables del modelo",
    description: "Variables usadas por el Modelo YAS para calcular el abastecimiento sugerido. WOS permite administrarlas."
  },
  R: {
    title: "Negocio: Reglas de abastecimiento",
    description: "Reglas de negocio aplicadas por el Modelo YAS. WOS permite administrarlas."
  },
  CALC: {
    title: "Calcular abastecimiento sugerido",
    description: "El Modelo YAS calcula una sugerencia a partir de las variables, las reglas y el stock SCE."
  },
  AR: {
    title: "Administración: ABM de Reglas",
    description: "WOS permite administrar reglas de abastecimiento; estas se usan en el Modelo YAS."
  },
  AV: {
    title: "Administración: ABM de Variables",
    description: "WOS permite administrar variables del Modelo YAS. El alta o edición de variables se refleja en el modelo."
  },
  GRID: {
    title: "Grilla de resultados",
    description: "Presenta tienda, proveedor, material y cantidad sugerida. Desde WOS se puede solicitar un recálculo."
  },
  CONF: {
    title: "Confirmar compra",
    description: "La confirmación de compra deriva los destinos SAP y SCE."
  },
  SAP: {
    title: "SAP",
    description: "Destino de la compra confirmada."
  },
  SCE: {
    title: "SCE",
    description: "Destino de la compra confirmada; también provee el dato de stock al flujo."
  }
};

const storageKey = "workspace-operativo:abastecimiento-wos-yas";
const form = document.querySelector("#details-form");
const title = document.querySelector("#details-title");
const descriptionField = document.querySelector("#details-description");
const notesField = document.querySelector("#details-notes");
const saveButton = document.querySelector("#save-button");
const clearButton = document.querySelector("#clear-button");
const saveStatus = document.querySelector("#save-status");
let activeId = null;
let savedDetails = {};

try {
  savedDetails = JSON.parse(localStorage.getItem(storageKey) || "{}");
} catch (error) {
  console.error("No se pudieron leer las notas guardadas.", error);
  saveStatus.textContent = "No se pudieron leer las notas guardadas.";
}

function showDetails(id) {
  const item = details[id];
  if (!item) return;

  activeId = id;
  title.textContent = item.title;
  descriptionField.value = savedDetails[id]?.description ?? item.description;
  notesField.value = savedDetails[id]?.notes ?? "";
  descriptionField.disabled = false;
  notesField.disabled = false;
  saveButton.disabled = false;
  clearButton.disabled = false;
  saveStatus.textContent = "";
}

window.showDetails = showDetails;

document.querySelectorAll(".flowchart [data-node]").forEach((node) => {
  node.addEventListener("click", () => showDetails(node.dataset.node));
  node.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showDetails(node.dataset.node);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!activeId) return;

  savedDetails[activeId] = {
    description: descriptionField.value,
    notes: notesField.value
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(savedDetails));
    saveStatus.textContent = "Guardado en este navegador.";
  } catch (error) {
    console.error("No se pudieron guardar las notas.", error);
    saveStatus.textContent = "Error al guardar. Revisa el almacenamiento del navegador.";
  }
});

clearButton.addEventListener("click", () => {
  if (!activeId) return;

  delete savedDetails[activeId];
  try {
    localStorage.setItem(storageKey, JSON.stringify(savedDetails));
    const item = details[activeId];
    descriptionField.value = item.description;
    notesField.value = "";
    saveStatus.textContent = "Notas borradas de este navegador.";
  } catch (error) {
    console.error("No se pudieron borrar las notas guardadas.", error);
    saveStatus.textContent = "Error al borrar. Revisa el almacenamiento del navegador.";
  }
});
