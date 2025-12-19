const state = {
  situation: "",
  people: 1,
  style: "simples",
  pro: false
};

// Navegação
function nextStep(n) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("step" + n).classList.add("active");
}

function selectSituation(s) {
  state.situation = s;
  nextStep(2);
}

function togglePro() {
  state.pro = !state.pro;
  alert(state.pro ? "Modo Avançado ativado 🚀" : "Modo Avançado desativado");
}

// Estilo
function setStyle(style) {
  state.style = style;
  state.people = parseInt(document.getElementById("people").value) || 1;
  generateList();
}

// Geração da lista
function generateList() {
  let data = {};

  if (state.situation === "churrasco") {
    data = {
      "🥩 Carnes": [
        { n: "Carne bovina", q: state.people * 0.4 + " kg" },
        { n: "Frango", q: state.people * 0.3 + " kg" }
      ],
      "🥗 Acompanhamentos": [
        { n: "Arroz", q: state.people * 0.2 + " kg" },
        { n: "Farofa", q: state.people * 0.1 + " kg" }
      ],
      "🥤 Bebidas": [
        { n: "Refrigerante", q: state.people * 0.6 + " L" }
      ]
    };
  }

  if (state.situation === "feira") {
    data = {
      "🍚 Básicos": [
        { n: "Arroz", q: "2 kg" },
        { n: "Feijão", q: "1 kg" }
      ],
      "🧼 Limpeza": [
        { n: "Detergente", q: "2 un" }
      ]
    };
  }

  render(data);
}

// Render
function render(data) {
  let html = `<h2>📦 Sua Lista</h2>`;

  for (let cat in data) {
    html += `<div class="category"><h3>${cat}</h3>`;
    data[cat].forEach(i => {
      html += `<div class="item">✔ ${i.n} — <strong>${i.q}</strong></div>`;
    });
    html += "</div>";
  }

  if (state.pro) {
    html += `
      <div class="category">
        <h3>🚀 Modo Avançado</h3>
        <div class="item">📊 Ajustes inteligentes</div>
        <div class="item">💾 Histórico salvo</div>
        <div class="item">📤 Exportar lista</div>
      </div>
    `;
  }

  document.getElementById("result").innerHTML = html;
  nextStep("result");
}
