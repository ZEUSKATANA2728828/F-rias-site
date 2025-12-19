let step = 1;
let state = {
  situation: "",
  profile: "",
  budget: 0,
  style: "",
  people: 5,
  economy: false,
  items: []
};

const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");

function showStep(n) {
  steps.forEach(s => s.classList.remove("active"));
  document.getElementById("step" + n)?.classList.add("active");
  if (n === 5) document.getElementById("result").classList.add("active");
  progressBar.style.width = ((n - 1) / 4) * 100 + "%";
}

function selectSituation(s) {
  state.situation = s;
  loadQuestions();
  step = 2;
  showStep(step);
}

function loadQuestions() {
  const el = document.getElementById("step2");

  if (state.situation === "volta_aulas") {
    el.innerHTML = `
      <h2>Aluno é:</h2>
      <button onclick="setProfile('crianca')">Criança</button>
      <button onclick="setProfile('adulto')">Adulto</button>
    `;
  } else if (state.situation === "aniversario") {
    el.innerHTML = `
      <h2>Tipo de festa</h2>
      <button onclick="setProfile('infantil')">Infantil</button>
      <button onclick="setProfile('jovem')">Jovem</button>
      <button onclick="setProfile('adulto')">Adulto</button>
    `;
  } else if (state.situation === "confraternizacao") {
    el.innerHTML = `
      <h2>Com quem?</h2>
      <button onclick="setProfile('familia')">Família</button>
      <button onclick="setProfile('amigos')">Amigos</button>
      <button onclick="setProfile('trabalho')">Trabalho</button>
      <button onclick="setProfile('todos')">Todos</button>
    `;
  } else {
    el.innerHTML = `
      <h2>Continuar</h2>
      <button onclick="setProfile('padrao')">➡️ Próximo</button>
    `;
  }
}

function setProfile(p) {
  state.profile = p;
  step = 3;
  showStep(step);
}

function setBudget(b) {
  state.budget = b;
  step = 4;
  showStep(step);
}

function toggleEconomy() {
  state.economy = !state.economy;
  alert("Modo economia extrema ativado!");
}

function setStyle(s) {
  state.style = s;
  state.people = document.getElementById("people").value;
  generateList();
}

function generateList() {
  step = 5;
  progressBar.style.width = "100%";

  let base = [];

  if (state.situation === "feira") {
    base = [
      "Arroz","Feijão","Óleo","Carne","Frango","Verduras",
      "Frutas","Leite","Pão","Higiene","Limpeza","Lanches (opcional)"
    ];
  }

  if (state.situation === "volta_aulas") {
    base = state.profile === "crianca"
      ? ["Caderno","Lápis","Borracha","Estojo","Mochila"]
      : ["Caderno","Caneta","Agenda"];
  }

  if (state.situation === "aniversario") {
    base = state.profile === "infantil"
      ? ["Bolo","Doces","Decoração","Lembrancinhas"]
      : ["Bolo","Salgados","Bebidas"];
  }

  if (state.economy) base = base.slice(0, Math.ceil(base.length / 2));

  state.items = base;

  renderResult();
}

function renderResult() {
  const el = document.getElementById("result");
  el.innerHTML = `
    <h2>✅ Sua lista</h2>
    <p>💰 Orçamento: R$ ${state.budget}</p>
    <p>👥 Pessoas: ${state.people}</p>

    ${state.items.map(i => `
      <label>
        <input type="checkbox" onchange="updateProgress()">
        ${i}
      </label><br>
    `).join("")}

    <p id="checkProgress">0% concluído</p>

    <button onclick="share()">📤 Compartilhar</button>
    <button onclick="window.print()">🧾 Imprimir</button>
  `;
}

function updateProgress() {
  const total = document.querySelectorAll("input[type=checkbox]").length;
  const done = document.querySelectorAll("input[type=checkbox]:checked").length;
  document.getElementById("checkProgress").innerText =
    Math.round((done / total) * 100) + "% concluído";
}

function goBack() {
  if (step > 1) {
    step--;
    showStep(step);
  }
}

function restart() {
  location.reload();
}

function randomPick() {
  const all = ["volta_aulas","feira","aniversario","confraternizacao","familia"];
  selectSituation(all[Math.floor(Math.random() * all.length)]);
}

document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

showStep(1);
