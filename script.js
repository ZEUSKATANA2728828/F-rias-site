const state = {
  situation: "",
  people: 1,
  style: "simples",
  pro: false
};

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

function setStyle(style) {
  state.style = style;
  state.people = parseInt(document.getElementById("people").value) || 1;
  generateList();
}

function generateList() {
  let data = {};
  let total = 0;

  if (state.situation === "churrasco") {
    data = {
      "🥩 Carnes": [
        { n: "Carne bovina", q: state.people * 0.4, u: "kg", p: 45 },
        { n: "Frango", q: state.people * 0.3, u: "kg", p: 20 }
      ],
      "🥤 Bebidas": [
        { n: "Refrigerante", q: state.people * 0.6, u: "L", p: 6 }
      ]
    };
  }

  if (state.situation === "feira") {
    data = {
      "🍚 Básicos": [
        { n: "Arroz", q: 2, u: "kg", p: 7 },
        { n: "Feijão", q: 1, u: "kg", p: 9 }
      ]
    };
  }

  let html = "<h2>📦 Sua Lista</h2>";
  let textShare = "📋 *Minha Lista*\n\n";

  for (let cat in data) {
    html += `<div class="category"><h3>${cat}</h3>`;
    textShare += `*${cat}*\n`;

    data[cat].forEach(i => {
      let cost = i.q * i.p;
      total += cost;
      html += `<div class="item">✔ ${i.n} — ${i.q}${i.u} (R$ ${cost.toFixed(2)})</div>`;
      textShare += `- ${i.n}: ${i.q}${i.u}\n`;
    });

    html += "</div>";
    textShare += "\n";
  }

  html += `<div class="total">💰 Total estimado: R$ ${total.toFixed(2)}</div>`;

  html += `
    <button onclick="shareWhats('${encodeURIComponent(textShare)}')">
      📤 Compartilhar no WhatsApp
    </button>
  `;

  if (state.pro) {
    html += `
      <div class="category">
        <h3>🚀 Modo Avançado</h3>
        <div class="item">📊 Ajuste inteligente</div>
        <div class="item">💾 Histórico salvo</div>
        <div class="item">📉 Modo economia</div>
      </div>
    `;
  }

  document.getElementById("result").innerHTML = html;
  nextStep("result");
}

function shareWhats(text) {
  window.open(`https://wa.me/?text=${text}`, "_blank");
}
