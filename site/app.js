const details = {
  "current-stage-1": {
    title: "Flujo actual · Generación de orden de compra",
    description: "Un notebook de Python conectado a Databricks recupera recepciones históricas, recepciones, stock, materiales y proveedores. Combina estos datos con reglas de proveedores y SKU en Excel y aplica el modelo matemático para generar un Excel de sugerencia de compra. Falta relevar la continuación hasta la orden de compra."
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
  "current-historical-receipts": {
    title: "Recepciones históricas",
    description: "Fuente de recepciones históricas consultada mediante Databricks para alimentar el modelo matemático."
  },
  "current-receipts": {
    title: "Recepciones",
    description: "Fuente de recepciones consultada mediante Databricks. Se representa por separado de las recepciones históricas."
  },
  "current-stock": {
    title: "Maestro de stock",
    description: "Datos de stock recuperados mediante Databricks para el cálculo de la sugerencia de compra."
  },
  "current-materials": {
    title: "Maestro de materiales",
    description: "Datos maestros de materiales recuperados mediante Databricks para el modelo matemático."
  },
  "current-suppliers": {
    title: "Maestro de proveedores",
    description: "Datos maestros de proveedores recuperados mediante Databricks. Esta fuente es distinta de las reglas de proveedores mantenidas en Excel."
  },
  "current-databricks": {
    title: "Databricks",
    description: "El notebook de Python se conecta a Databricks para recuperar las cinco fuentes de datos mencionadas. No se ha definido dónde se originan o almacenan esas fuentes."
  },
  "current-supplier-rules": {
    title: "Excel · Reglas de proveedores",
    description: "Reglas de proveedores mantenidas en Excel que el notebook combina con la información recuperada de Databricks."
  },
  "current-sku-rules": {
    title: "Excel · Reglas de SKU",
    description: "Reglas de SKU mantenidas en Excel que el notebook combina con los datos y las reglas de proveedores."
  },
  "current-notebook": {
    title: "Notebook de Python",
    description: "Conectado a Databricks, recupera los datos y los combina con las reglas de proveedores y SKU en Excel para aplicar el modelo matemático."
  },
  "current-model": {
    title: "Modelo matemático",
    description: "Cálculo aplicado mediante el notebook de Python sobre los datos recuperados y las reglas en Excel. Se representa como un paso lógico, no como un sistema independiente."
  },
  "current-purchase-suggestion": {
    title: "Excel · Sugerencia de compra",
    description: "Archivo Excel generado como resultado del cálculo. Es una sugerencia de compra, no una orden de compra. Su revisión y la posterior generación de la orden todavía no se han relevado."
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
    ? "Documentado hasta la sugerencia de compra"
    : activeFlow === "proposed" && activeStage === "3"
      ? "Pendiente de pulir y presentar a gerencia"
      : "Pendiente de relevar y definir";
  const summary = stage.description;

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
