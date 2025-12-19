let dados = {
  situacao: "",
  perfil: "",
  serie: "",
  orcamento: 0,
  estilo: ""
};

const steps = ["step1","step2","step3","step4","resultado"];

function trocar(atual, proximo) {
  document.getElementById(atual).classList.add("hidden");
  document.getElementById(proximo).classList.remove("hidden");
}

function escolherSituacao(s) {
  dados.situacao = s;
  montarPerguntas();
  trocar("step1","step2");
}

function montarPerguntas() {
  const step2 = document.getElementById("step2");
  step2.innerHTML = "";

  if (dados.situacao === "volta_aulas") {
    step2.innerHTML = `
      <h2>O aluno é:</h2>
      <button onclick="perfil('crianca')">👶 Criança</button>
      <button onclick="perfil('adulto')">🧑 Adulto</button>
    `;
  }

  else if (dados.situacao === "aniversario") {
    step2.innerHTML = `
      <h2>Festa para:</h2>
      <button onclick="perfil('infantil')">👶 Infantil</button>
      <button onclick="perfil('jovem')">🧒 Jovem</button>
      <button onclick="perfil('adulto')">🧑 Adulto</button>
    `;
  }

  else if (dados.situacao === "confraternizacao") {
    step2.innerHTML = `
      <h2>Vai ser com quem?</h2>
      <button onclick="perfil('familia')">👨‍👩‍👧 Família</button>
      <button onclick="perfil('amigos')">🧑‍🤝‍🧑 Amigos</button>
      <button onclick="perfil('trabalho')">🏢 Trabalho</button>
      <button onclick="perfil('todos')">🌐 Todos</button>
    `;
  }

  else {
    step2.innerHTML = `
      <h2>Continuar</h2>
      <button onclick="perfil('padrao')">➡️ Próximo</button>
    `;
  }
}

function perfil(p) {
  dados.perfil = p;

  if (dados.situacao === "volta_aulas") {
    document.getElementById("step2").innerHTML = `
      <h2>Qual a série?</h2>
      <button onclick="serie('infantil')">Infantil</button>
      <button onclick="serie('fundamental')">Fundamental</button>
      <button onclick="serie('medio')">Ensino Médio</button>
      <button onclick="serie('faculdade')">Faculdade</button>
    `;
  } else {
    trocar("step2","step3");
  }
}

function serie(s) {
  dados.serie = s;
  trocar("step2","step3");
}

function definirOrcamento(o) {
  dados.orcamento = o;
  trocar("step3","step4");
}

function definirEstilo(e) {
  dados.estilo = e;
  mostrarResultado();
}

function mostrarResultado() {
  trocar("step4","resultado");
  const r = document.getElementById("resultado");

  let lista = [];

  if (dados.situacao === "feira") {
    lista = ["Arroz","Feijão","Carnes","Verduras","Frutas","Limpeza","Higiene","Lanches (opcional)"];
  }
  else if (dados.situacao === "volta_aulas") {
    lista = dados.perfil === "crianca"
      ? ["Caderno","Lápis","Borracha","Mochila"]
      : ["Caderno","Caneta","Mochila"];
  }
  else if (dados.situacao === "aniversario") {
    lista = dados.perfil === "infantil"
      ? ["Bolo","Doces","Decoração","Lembrancinhas"]
      : ["Bolo","Salgados","Bebidas"];
  }
  else {
    lista = ["Itens básicos","Bebidas","Descartáveis"];
  }

  r.innerHTML = `
    <h2>✅ Sua lista</h2>
    <p>Orçamento: R$ ${dados.orcamento}</p>
    ${lista.map(i => `<label><input type="checkbox"> ${i}</label><br>`).join("")}
    <br>
    <button onclick="window.location.reload()">🔄 Recomeçar</button>
  `;
}

/* Extras */
document.getElementById("darkMode").onclick = () => {
  document.body.classList.toggle("dark");
};

function aleatorio() {
  const op = ["planejamento","volta_aulas","feira","aniversario","festa_casa"];
  escolherSituacao(op[Math.floor(Math.random()*op.length)]);
}
