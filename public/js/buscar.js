const barraPesquisa = document.getElementById("barra-pesquisa");
const corpoTabela = document.getElementById("corpo-tabela");
const filtro = document.getElementById("filtrar-por");

async function pegarDados(x = "/dados-buscar") {
  const res = await fetch(x);
  const dados = await res.json();
  return dados;
}

async function mostrarObjetos(x = "/dados-buscar") {
  corpoTabela.innerHTML = ``;
  const dados = await pegarDados(x);
  dados.forEach((element, index) => {
    const novoObjeto = document.createElement("tr");
    novoObjeto.innerHTML = `
              <td class="linha" id="linha${index}">${element.codigo}</td>
              <td>${element.NomeDoTipo}</td>
              <td class="complemento"></td>
              <td>${element.NomeSala}</td>
              <td>${element.Nome}</td>
              <td class="editar" id="editar${index}"><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pencil-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"
          />
        </svg></td>`;

    corpoTabela.appendChild(novoObjeto);
    const celulaComplemento = novoObjeto.querySelector(".complemento");
    celulaComplemento.textContent = element.Complemento || "Sem nome";

    const buttonEdit = document.querySelector(`#editar${index}`);
    buttonEdit.addEventListener("click", () => editarObjeto(index));
  });
}
mostrarObjetos();

async function editarObjeto(index) {
  const codigo = document.getElementById(`linha${index}`).textContent;
  pegarDados().then((dados) => {
    const objetoSelecionado = dados.find(
      (item) => item.codigo.toString() === codigo
    );
    if (objetoSelecionado) {
      localStorage.setItem(
        "objetoParaEditar",
        JSON.stringify(objetoSelecionado)
      );
      window.location.href = "/atualizar.html"; // redireciona para a página de edição
    }
  });
}

async function pesquisar(input, tipoFiltro) {
  corpoTabela.innerHTML = ``;
  const dados = await pegarDados();
  const termo = input.toString().toLowerCase();
  const filtrados = dados.filter((item) => {
    const valor = item[tipoFiltro];
    if (valor === null || valor === undefined) return false;
    return valor.toString().toLowerCase().includes(termo);
  });

  filtrados.forEach((element, index) => {
    const novoObjeto = document.createElement("tr");
    novoObjeto.innerHTML = `
              <td class="linha" id="linha${index}">${element.codigo}</td>
              <td>${element.NomeDoTipo}</td>
              <td>${element.Complemento ? element.Complemento : "Sem nome"}</td>
              <td>${element.NomeSala}</td>
              <td>${element.Nome}</td>
              <td class="editar" id="editar${index}"><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pencil-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"
          />
        </svg></td>`;

    corpoTabela.appendChild(novoObjeto);

    const buttonEdit = document.querySelector(`#editar${index}`);
    buttonEdit.addEventListener("click", () => editarObjeto(index));
  });
}

filtro.addEventListener("change", async () => {
  switch (filtro.value){
    case "codigo":
      mostrarObjetos()
      break;

    case "NomeDoTipo":
      mostrarObjetos("/dados-buscar-tipo-obj")
      break;

    case "Complemento":
      mostrarObjetos("/dados-buscar-nome")
      break;

    case "NomeSala":
      mostrarObjetos("/dados-buscar-sala")
      break;

    case "Nome":
      mostrarObjetos("/dados-buscar-status")
      break;
  }
});

barraPesquisa.addEventListener("input", () =>
  pesquisar(barraPesquisa.value, filtro.value)
);

// codigo.forEach((element, index) =>{
//   codigo[index].addEventListener("click", function (){
//   console.log(element.value)})
// })

// 0: {codigo: 1234, NomeDoTipo: 'Computador', Nome: 'Ótimo', NomeSala: 'Sub. Macedo', Complemento: null}
// 1: {codigo: 1111, NomeDoTipo: 'Impressora', Nome: 'Ótimo', NomeSala: 'Copa', Complemento: null}
// 2: {codigo: 4444, NomeDoTipo: 'Computador', Nome: 'Ótimo', NomeSala: 'Tião Karate', Complemento: null}
// 3: {codigo: 2222, NomeDoTipo: 'Monitor', Nome: 'Bom', NomeSala: 'COTEC', Complemento: null}
// 4: {codigo: 3333, NomeDoTipo: 'Impressora', Nome: 'Ruim', NomeSala: 'Sala reunião', Complemento: null}
