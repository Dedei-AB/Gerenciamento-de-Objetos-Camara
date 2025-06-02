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

botaoConcluido.addEventListener("click", async function () {
  const dados = await pegarDados();
  const idObjeto = dados.length + 1;
  const codigoObj = document.getElementById("codigoInput-cadastro").value.trim();
  const obj = nomeObjeto.value.trim();
  const complemento = nomeComplemento.value.trim();
  const estado = nomeStatus.value.trim();
  const piso = nomePiso.value.trim();
  const local = nomeLocal.value.trim();

  if (!obj || !complemento || !estado || !piso || !local) {
    mostrarAlerta("Por favor, preencha todos os campos antes de concluir o cadastro.");
    return;
  }

  if (codigoObj.length < 4){
    alert("Código do objeto inválido. O código teve ter 4 dígitos!")
    return;
  }

  const payload = {
    idObjeto,
    codigo: codigoObj,
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
    mostrarAlerta(data.mensagem || data.erro);
    if (!data.erro) {
      window.location.href = "buscar.html";
    }
  } catch (err) {
    mostrarAlerta("Erro ao cadastrar: " + err.message);
  }
});

function mostrarAlerta(mensagem) {
  document.getElementById("mensagemAlerta").textContent = mensagem;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("meuAlerta").style.display = "block";
}

function fecharAlerta() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("meuAlerta").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const fechar = document.querySelector(".fechar");
  if (fechar) {
    fechar.addEventListener("click", fecharAlerta);
  }
});
