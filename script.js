let current = "home";
let marketMode = false;

const items = [
  { name: "Arroz", qty: "5kg" },
  { name: "Feijão", qty: "2kg" },
  { name: "Carne", qty: "2kg" },
  { name: "Frango", qty: "2kg" },
  { name: "Refrigerante", qty: "4L" }
];

let checklist = JSON.parse(localStorage.getItem("checklist")) || {};
let history = JSON.parse(localStorage.getItem("history")) || [];

function go(screen) {
  current = screen;
  render();
}

function toggleItem(name) {
  checklist[name] = !checklist[name];
  localStorage.setItem("checklist", JSON.stringify(checklist));
  if (navigator.vibrate) navigator.vibrate(40);
  render();
}

function getProgress() {
  const total = items.length;
  const done = items.filter(i => checklist[i.name]).length;
  return {
    total,
    done,
    remaining: total - done,
    percent: Math.round((done / total) * 100)
  };
}

function renderHome() {
  const p = getProgress();
  return `
    <h2>📋 Lista Inteligente</h2>

    <div class="card">
      <strong>Status</strong>
      <p>Comprados: ${p.done}</p>
      <p>Faltam: ${p.remaining}</p>
      <div style="background:#eee;border-radius:10px;overflow:hidden">
        <div style="width:${p.percent}%;background:#0a7cff;color:white;text-align:center">
          ${p.percent}%
        </div>
      </div>
    </div>

    <button onclick="go('list')">🛒 Ir para lista</button>
  `;
}

function renderList() {
  return `
    <h2>🛒 Lista de Compras</h2>

    <div class="card">
      ${items.map(i => `
        <div class="item" onclick="toggleItem('${i.name}')">
          <input type="checkbox" ${checklist[i.name] ? "checked" : ""}/>
          <span class="${checklist[i.name] ? "done" : ""}">
            ${i.name} — ${i.qty}
          </span>
        </div>
      `).join("")}
    </div>

    <button class="secondary" onclick="clearChecklist()">🧹 Limpar</button>
  `;
}

function renderHistory() {
  return `
    <h2>📊 Histórico</h2>

    ${history.length === 0 ? "<p>Nenhum histórico</p>" : ""}
    ${history.map(h => `
      <div class="card">
        ${h}
      </div>
    `).join("")}
  `;
}

function renderSettings() {
  return `
    <h2>⚙️ Configurações</h2>

    <div class="card">
      <button onclick="toggleMarketMode()">🛍️ Modo Mercado</button>
      <button class="secondary" onclick="resetAll()">🧨 Resetar tudo</button>
    </div>
  `;
}

function toggleMarketMode() {
  marketMode = !marketMode;
  alert(marketMode ? "Modo mercado ON" : "Modo mercado OFF");
}

function clearChecklist() {
  checklist = {};
  localStorage.removeItem("checklist");
  render();
}

function resetAll() {
  localStorage.clear();
  location.reload();
}

function render() {
  const screen = document.getElementById("screen");

  if (current === "home") screen.innerHTML = renderHome();
  if (current === "list") screen.innerHTML = renderList();
  if (current === "history") screen.innerHTML = renderHistory();
  if (current === "settings") screen.innerHTML = renderSettings();
}

render();
