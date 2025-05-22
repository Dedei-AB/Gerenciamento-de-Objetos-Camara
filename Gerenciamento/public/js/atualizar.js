const idInput = document.getElementById("objetoID");
const informacoes = document.getElementById("informacoes");
const botaoBuscar = document.getElementById("botaoBuscar");

async function pegarObjetos() {
  const resposta = await fetch(`/dados-buscar/${idDigitado}`);
  const dados = await resposta.json();
  console.log(dados);
  return dados;
}

botaoBuscar.addEventListener("click", async (e) => {
  e.preventDefault(); // Impede o envio do form
  const idDigitado = idInput.value.trim().toLowerCase();

  if (!idDigitado) {
    alert("Digite um ID ou nome de objeto.");
    return;
  }

  try {
    const resposta = await fetch(`/dados-buscar/${idDigitado}`);
    if (!resposta.ok) {
      informacoes.innerHTML = `<p style="color:red">Objeto não encontrado.</p>`;
      return;
    }

    const objetoEncontrado = await resposta.json();

    // Atualiza dinamicamente os campos com os dados do objeto
    informacoes.innerHTML = `
        <label class="descrição-input" for="estadoObjeto">Estado do objeto</label>
        <select class="input-atualizar" name="estado" id="estadoObjeto">
            <option value="Ótimo" ${
              objetoEncontrado.estado === "Ótimo" ? "selected" : ""
            }>Ótimo</option>
            <option value="Bom" ${
              objetoEncontrado.estado === "Bom" ? "selected" : ""
            }>Bom</option>
            <option value="Ruim" ${
              objetoEncontrado.estado === "Ruim" ? "selected" : ""
            }>Ruim</option>
        </select><br><br>

       <div class="lugares">
        <label class="descrição-input" for="piso">Piso</label><br>
        <select class="input-atualizar" id="piso">
            <option value="piso1" ${
              objetoEncontrado.piso === "piso1" ? "selected" : ""
            }>Piso 1</option>
            <option value="piso2" ${
              objetoEncontrado.piso === "piso2" ? "selected" : ""
            }>Piso 2</option>
            <option value="Garagem" ${
              objetoEncontrado.piso === "Garagem" ? "selected" : ""
            }>Garagem</option>
        </select>
      </div><br>

      <div class="lugares">
        <label class="descrição-input" for="local">Nome do local:</label>
        <input class="input-atualizar" type="text" id="local" value="${
          objetoEncontrado.local || ""
        }">
      </div>

      <button class="atualizar" type="submit">Atualizar</button>
    `;
  } catch (error) {
    console.error("Erro ao buscar objeto:", error);
    informacoes.innerHTML = `<p style="color:red">Erro ao buscar o objeto.</p>`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const dados = JSON.parse(localStorage.getItem("objetoParaEditar"));
  if (dados) {
    console.log("Objeto recebido:", dados);
    // Aqui você pode preencher campos com os valores recebidos, por exemplo:
    document.getElementById("codigo").value = dados.codigo;
    document.getElementById("nome").value = dados.Nome;
    // ... e assim por diante
  }
});
