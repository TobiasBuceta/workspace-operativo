const stageDescriptions = {
  "current-stage-1": "Un notebook de Python conectado a Databricks recupera recepciones históricas, recepciones, stock, materiales y proveedores. Combina estos datos con reglas de proveedores y SKU en Excel y aplica el modelo matemático para generar un Excel de sugerencia de compra. Falta relevar la continuación hasta la orden de compra.",
  "current-stage-2": "Etapa pendiente de relevar. Falta documentar el proceso actual de facturación en SAP.",
  "current-stage-3": "Etapa pendiente de relevar y ordenar antes de definir una propuesta para gerencia.",
  "proposed-stage-1": "Propuesta pendiente de definición para la generación de órdenes de compra.",
  "proposed-stage-2": "Propuesta pendiente de definición para la facturación en SAP.",
  "proposed-stage-3": "Etapa pendiente de pulir y presentar como propuesta a gerencia."
};

const stageOverview = document.querySelector("#stage-overview");
const orderDiagram = document.querySelector("#current-order-diagram");
const flowButtons = document.querySelectorAll("[data-flow]");
const stageButtons = document.querySelectorAll("[data-stage]");
let activeFlow = "current";
let activeStage = "1";

const stageNames = {
  1: "Generación de orden de compra",
  2: "Facturación en SAP",
  3: "Manejo de maestros"
};

function updateStage() {
  const stageId = `${activeFlow}-stage-${activeStage}`;
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

  stageOverview.replaceChildren();
  const statusBadge = document.createElement("span");
  statusBadge.className = isCurrentOrderDiagram ? "stage-badge documented" : "stage-badge pending";
  statusBadge.textContent = status;
  const summaryText = document.createElement("p");
  summaryText.textContent = stageDescriptions[stageId];
  stageOverview.append(statusBadge, summaryText);

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

updateStage();
