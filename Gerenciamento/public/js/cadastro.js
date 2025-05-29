const pisoSelecionado = document.getElementById("piso-cadastro");
const localSelect = document.getElementById("local-cadastro");
const botaoConcluido = document.getElementById("concluido-cadastro");
const nomeObjeto = document.getElementById("obj-cadastro");
const nomeComplemento = document.getElementById("complemento-cadastro");
const nomeStatus = document.getElementById("estado-cadastro");
const nomePiso = document.getElementById("piso-cadastro");
const nomeLocal = document.getElementById("local-cadastro");

async function pegarDados() {
  const res = await fetch("/dados-buscar");
  const dados = await res.json();
  console.log("Dados", dados);
  return dados;
}

async function pegarSalas() {
  const res = await fetch("/salas");
  const salas = await res.json();
  return salas;
}

async function atualizarLocais() {
  const salas = await pegarSalas();
  localSelect.innerHTML = "";
  salas.forEach((element) => {
    if (element.Piso_idPiso == pisoSelecionado.value) {
      const option = document.createElement("option");
      option.value = element.idSala;
      option.text = element.NomeSala;
      localSelect.appendChild(option);
    }
  });
}

pisoSelecionado.addEventListener("change", atualizarLocais);

function gerarCodigo() {
  const codigoGerado = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("numero").textContent = `${codigoGerado}`;
  document.getElementById("codigoInput-cadastro").value = `${codigoGerado}`;
}

botaoConcluido.addEventListener("click", async function () {
  const dados = await pegarDados();
  const idObjeto = dados.length + 1;
  const obj = nomeObjeto.value.trim();
  const complemento = nomeComplemento.value.trim();
  const estado = nomeStatus.value.trim();
  const piso = nomePiso.value.trim();
  const local = nomeLocal.value.trim();

  if (!obj || !complemento || !estado || !piso || !local) {
    alert("Por favor, preencha todos os campos antes de concluir o cadastro.");
    return;
  }

  const payload = {
    idObjeto,
    codigo: document.getElementById("codigoInput-cadastro").value,
    tipoObjeto: obj,
    status: estado,
    sala: local,
    complemento: complemento,
  };

  try {
    const res = await fetch("http://localhost:3000/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const texto = await res.text();
      throw new Error(`Erro ${res.status}: ${texto}`);
    }

    const data = await res.json();
    alert(data.mensagem || data.erro);
    if (!data.erro) {
      window.location.href = "buscar.html";
    }
  } catch (err) {
    alert("Erro ao cadastrar: " + err.message);
  }
});

gerarCodigo();
gerarCodigo();
