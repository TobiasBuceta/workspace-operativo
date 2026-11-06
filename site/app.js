const details = {
  "current-stage-1": {
    title: "Flujo actual · Generación de orden de compra",
    description: "El diagrama existente documenta el abastecimiento sugerido por Modelo YAS, la administración de reglas y variables en WOS, y la confirmación de compra."
  },
  "current-stage-2": {
    title: "Flujo actual · Facturación en SAP",
    description: "Etapa pendiente de relevar. Falta documentar el proceso actual de facturación en SAP."
  },
  "current-stage-3": {
    title: "Flujo actual · Manejo de maestros",
    description: "Etapa pendiente de relevar y ordenar antes de definir una propuesta para gerencia."
  },
  "proposed-stage-1": {
    title: "Flujo propuesto · Generación de orden de compra",
    description: "Propuesta pendiente de definición para la generación de órdenes de compra."
  },
  "proposed-stage-2": {
    title: "Flujo propuesto · Facturación en SAP",
    description: "Propuesta pendiente de definición para la facturación en SAP."
  },
  "proposed-stage-3": {
    title: "Flujo propuesto · Manejo de maestros",
    description: "Etapa pendiente de pulir y presentar como propuesta a gerencia."
  },
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
const stageOverview = document.querySelector("#stage-overview");
const orderDiagram = document.querySelector("#current-order-diagram");
const flowButtons = document.querySelectorAll("[data-flow]");
const stageButtons = document.querySelectorAll("[data-stage]");
let activeId = null;
let savedDetails = {};
let activeFlow = "current";
let activeStage = "1";

const stageNames = {
  1: "Generación de orden de compra",
  2: "Facturación en SAP",
  3: "Manejo de maestros"
};

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

function updateStage() {
  const stageId = `${activeFlow}-stage-${activeStage}`;
  const stage = details[stageId];
  const isCurrentOrderDiagram = activeFlow === "current" && activeStage === "1";

  stageButtons.forEach((button) => {
    const isActive = button.dataset.stage === activeStage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  orderDiagram.hidden = !isCurrentOrderDiagram;

  const status = isCurrentOrderDiagram
    ? "Proceso documentado"
    : activeFlow === "proposed" && activeStage === "3"
      ? "Pendiente de pulir y presentar a gerencia"
      : "Pendiente de relevar y definir";
  const summary = isCurrentOrderDiagram
    ? "Referencia actual: Modelo YAS calcula el abastecimiento sugerido, WOS administra reglas y variables, y la compra se confirma desde la grilla. Selecciona un bloque para ver o editar su información."
    : stage.description;

  stageOverview.replaceChildren();
  const statusBadge = document.createElement("span");
  statusBadge.className = isCurrentOrderDiagram ? "stage-badge documented" : "stage-badge pending";
  statusBadge.textContent = status;
  const summaryText = document.createElement("p");
  summaryText.textContent = summary;
  const notesButton = document.createElement("button");
  notesButton.type = "button";
  notesButton.className = "text-button";
  notesButton.textContent = "Ver o agregar notas de esta etapa";
  notesButton.addEventListener("click", () => showDetails(stageId));
  stageOverview.append(statusBadge, summaryText, notesButton);

  if (!isCurrentOrderDiagram) {
    const placeholder = document.createElement("div");
    placeholder.className = "stage-placeholder";
    const icon = document.createElement("span");
    icon.className = "placeholder-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "+";
    const heading = document.createElement("strong");
    heading.textContent = stageNames[activeStage];
    const message = document.createElement("span");
    message.textContent = "El detalle de este flujo se completará al relevar la etapa.";
    placeholder.append(icon, heading, message);
    stageOverview.append(placeholder);
  }
}

flowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFlow = button.dataset.flow;
    flowButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    updateStage();
  });
});

stageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeStage = button.dataset.stage;
    updateStage();
  });
});

document.querySelectorAll(".flowchart [data-node]").forEach((node) => {
  node.addEventListener("click", () => showDetails(node.dataset.node));
  node.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showDetails(node.dataset.node);
    }
  });
});

updateStage();

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
