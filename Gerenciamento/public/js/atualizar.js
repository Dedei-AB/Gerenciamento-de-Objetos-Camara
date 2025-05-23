const botaoAtualizar = document.getElementById("btn-atualizar");
const pisoSelect = document.getElementById("pisos");
const salaSelect = document.getElementById("salas");
const statusSelect = document.getElementById("estadoObjeto");
const nomeobjeto = document.getElementById("nome-objeto");

async function pegarSalas() {
  const resposta = await fetch("/salas");
  const dados = await resposta.json();
  console.log(dados);
  return dados;
}

pegarSalas();

/* Essa parte é responsável por receber os valores da página buscar.html e 
Alterar os valores de acordo com o objeto selecionado.*/
document.addEventListener("DOMContentLoaded", async () => {
  const dados = JSON.parse(localStorage.getItem("objetoParaEditar"));
  if (dados) {
    console.log("Objeto recebido:", dados);
    document.getElementById("codigo").innerHTML = `${dados.codigo}`;
    document.getElementById("nome-objeto").value = `${dados.Complemento}`;
    if (dados.Nome == "Bom") {
      document.getElementById("estadoObjeto").innerHTML = `              
              <option value="1">Bom</option>
              <option value="2">Utilizável</option>
              <option value="3">Ruim</option>`;
    } else if (dados.Nome == "Utilizável") {
      document.getElementById("estadoObjeto").innerHTML = `              
              <option value="2">Utilizável</option>
              <option value="1">Bom</option>
              <option value="3">Ruim</option>`;
    } else {
      document.getElementById("estadoObjeto").innerHTML = `              
              <option value="3">Ruim</option>
              <option value="2">Utilizável</option>
              <option value="1">Bom</option>`;
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

    async function ordenarSalas() {
      await atualizarSala();
      const opcoes = Array.from(salaSelect.options);
      const opcao1 = opcoes.find(
        (element) => element.text === `${dados.NomeSala}`
      );
      salaSelect.innerHTML = ``;
      salaSelect.appendChild(opcao1);
      const x = opcoes.filter((opt) => opt !== opcao1);
      x.forEach((opt) => {
        salaSelect.appendChild(opt);
      });
      salaSelect.value = opcao1.value;
    }
    ordenarSalas();
  }
});

/*Essa parte é responsável por enviar os dados alterados para o banco de dados*/
botaoAtualizar.addEventListener("click", async function () {
  const idObjeto = document.getElementById("codigo").textContent;

  if (!nomeobjeto.value) {
    alert("Preencha todos os campos!");
    return;
  }

  const payload = {
    status: Number(statusSelect.value),
    sala: Number(salaSelect.value),
    complemento: nomeobjeto.value,
    codigo: Number(idObjeto),
  };

  const res = await fetch("http://localhost:3000/atualizar", {
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
