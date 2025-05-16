const pisoSelecionado = document.getElementById("piso-cadastro");
const localSelect = document.getElementById("local-cadastro");
const botaoConcluido = document.getElementById("concluido-cadastro");
const nomeObjeto = document.getElementById("obj-cadastro");
const nomeComplemento = document.getElementById("complemento-cadastro");
const nomeStatus = document.getElementById("estado-cadastro");
const nomePiso = document.getElementById("piso-cadastro");
const nomeLocal = document.getElementById("local-cadastro");

// Pop-up

document
  .getElementById("concluido-cadastro")
  .addEventListener("click", function () {
    const obj = document.getElementById("obj-cadastro").value.trim();
    const complemento = document
      .getElementById("complemento-cadastro")
      .value.trim();
    const estado = document.getElementById("estado-cadastro").value.trim();
    const piso = document.getElementById("piso-cadastro").value.trim();
    const local = document.getElementById("local-cadastro").value.trim();

    if (!obj || !complemento || !estado || !piso || !local) {
      alert(
        "Por favor, preencha todos os campos antes de concluir o cadastro."
      );
    } else {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "buscar.html";
    }
  });

// Mapas de locais com IDs corrigidos

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
  console.log(salas);
  console.log(nomeObjeto.value);
}

pisoSelecionado.addEventListener("change", atualizarLocais);

// Eviar formulário

// Geração de código

function gerarCodigo() {
  const codigoGerado = Math.floor(1000 + Math.random() * 9000);

  document.getElementById("numero").textContent = `${codigoGerado}`;
  document.getElementById("codigoInput-cadastro").value = `${codigoGerado}`;
}

// Envio do formulário
botaoConcluido.addEventListener("click", async function () {
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
    codigo: document.getElementById("codigoInput-cadastro").value,
    tipoObjeto: obj,
    status: estado,
    sala: local,
    complemento: complemento,
  };

  const res = await fetch("http://localhost:3000/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  alert(data.mensagem || data.erro);
  if (!data.erro) {
    window.location.href = "buscar.html";
  }
});

// Iniciar com código
gerarCodigo();
