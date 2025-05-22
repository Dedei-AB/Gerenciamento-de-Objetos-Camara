const idInput = document.getElementById("objetoID");
const informacoes = document.getElementById("informacoes");
const botaoBuscar = document.getElementById("botaoBuscar");

async function pegarSalas() {
  const resposta = await fetch("/salas");
  const dados = await resposta.json();
  return dados;
}

pegarSalas();

document.addEventListener("DOMContentLoaded", () => {
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
    async function salaParaPiso(nomeSala) {
      const salas = await pegarSalas();
      document.getElementById("pisos").innerHTML = salas.forEach((element) => {
        if (element.NomeSala == nomeSala) {
          console.log(element.Piso_idPiso);
          return element.Piso_idPiso;
        }
      });
    }
    if (Number(salaParaPiso(dados.NomeSala)) == 1) {
      document.getElementById("pisos").innerHTML = `
                  <option value="piso1">Piso 1</option>
                  <option value="piso2">Piso 2</option>
                  <option value="Garagem">Garagem</option>`;
    } else if (Number(salaParaPiso(dados.NomeSala)) == 2) {
      document.getElementById("pisos").innerHTML = `
                  <option value="piso2">Piso 2</option>
                  <option value="piso1">Piso 1</option>
          <option value="Garagem">Garagem</option>`;
    } else {
      document.getElementById(
        "pisos"
      ).innerHTML = `<option value="Garagem">Garagem</option>
      <option value="piso1">Piso 1</option>
      <option value="piso2">Piso 2</option>`;
    }
  }
});
