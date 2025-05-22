const idInput = document.getElementById("objetoID");
const informacoes = document.getElementById("informacoes");
const botaoBuscar = document.getElementById("botaoBuscar");
const salaSelect = document.getElementById("salas");
const pisoSelect = document.getElementById("pisos");

async function pegarSalas() {
  const resposta = await fetch("/salas");
  const dados = await resposta.json();
  console.log(dados);
  return dados;
}

pegarSalas();

document.addEventListener("DOMContentLoaded", async () => {
  const dados = JSON.parse(localStorage.getItem("objetoParaEditar"));
  if (dados) {
    console.log("Objeto recebido:", dados);
    // Aqui você pode preencher campos com os valores recebidos, por exemplo:
    document.getElementById("codigo").innerHTML = `${dados.codigo}`;
    document.getElementById("nome-objeto").value = `${dados.Complemento}`;
    if (dados.Nome == "Bom") {
      document.getElementById("estadoObjeto").innerHTML = `              
              <option value="Bom">Bom</option>
              <option value="Utilizável">Utilizável</option>
              <option value="Ruim">Ruim</option>`;
    } else if (dados.Nome == "Utilizável") {
      document.getElementById("estadoObjeto").innerHTML = `              
              <option value="Utilizável">Utilizável</option>
              <option value="Bom">Bom</option>
              <option value="Ruim">Ruim</option>`;
    } else {
      document.getElementById("estadoObjeto").innerHTML = `              
              <option value="Ruim">Ruim</option>
              <option value="Utilizável">Utilizável</option>
              <option value="Bom">Bom</option>`;
    }

    // Atualizar piso
    async function salaParaPiso(nomeSala) {
      const salas = await pegarSalas();
      const sala = salas.find((element) => element.NomeSala === nomeSala);
      return sala ? sala.Piso_idPiso : null;
    }
    const piso = await salaParaPiso(dados.NomeSala);
    console.log(piso);
    if (piso == 1) {
      document.getElementById("pisos").innerHTML = `
                  <option value="1">Piso 1</option>
                  <option value="2">Piso 2</option>
                  <option value="3">Garagem</option>`;
    } else if (piso == 2) {
      document.getElementById("pisos").innerHTML = `
                  <option value="2">Piso 2</option>
                  <option value="1">Piso 1</option>
          <option value="3">Garagem</option>`;
    } else {
      document.getElementById(
        "pisos"
      ).innerHTML = `<option value="3">Garagem</option>
      <option value="1">Piso 1</option>
      <option value="2">Piso 2</option>`;
    }

    // Atualizar sala
    async function atualizarSala() {
      const salas = await pegarSalas();
      salaSelect.innerHTML = "";
      salas.forEach((element) => {
        if (element.Piso_idPiso == pisoSelect.value) {
          const option = document.createElement("option");
          option.value = element.idSala;
          option.text = element.NomeSala;
          salaSelect.appendChild(option);
        }
      });
    }
    atualizarSala();

    pisoSelect.addEventListener("change", atualizarSala);

    ordenarSalas();
    async function ordenarSalas() {
      await atualizarSala();
      const opcoes = Array.from(salaSelect.options);
      const opcao1 = opcoes.find(
        (element) => element.text === `${dados.NomeSala}`
      );
      salaSelect.innerHTML = ``;
      salaSelect.appendChild(opcao1);
      opcoes
        .filter((opt) => opt !== opcao1)
        .forEach((opt) => opcoes.appendChild(opt));
      console.log(opcao1);
    }
  }
});
