const barraPesquisa = document.getElementById("barra-pesquisa");
const corpoTabela = document.getElementById("corpo-tabela");
const filtro = document.getElementById("filtrar-por");
const editar = document.getElementById("lapis");
const fechar = document.getElementById("fechar");

async function pegarDados() {
  const res = await fetch("/dados-buscar");
  const dados = await res.json();
  console.log("Dados", dados);
  return dados;
}

async function mostrarObjetos() {
  corpoTabela.innerHTML = ``;
  const dados = await pegarDados();
  dados.forEach((element, index) => {
    corpoTabela.innerHTML += `<tr>
              <td class="linha" id="linha${index}">${element.codigo}</td>
              <td>${element.NomeDoTipo}</td>
              <td>${element.Complemento ? element.Complemento : "Sem nome"}</td>
              <td>${element.NomeSala}</td>
              <td>${element.Nome}</td>
               </tr>`;
  });
}
mostrarObjetos();

async function pesquisar(input, tipoFiltro) {
  corpoTabela.innerHTML = ``;
  const dados = await pegarDados();
  const termo = input.toString().toLowerCase();
  const filtrados = dados.filter((item) => {
    const valor = item[tipoFiltro];
    if (valor === null || valor === undefined) return false;
    return valor.toString().toLowerCase().includes(termo);
  });

  filtrados.forEach((valor) => {
    let novaLista = document.createElement("tr");
    novaLista.innerHTML += `
              <td>${valor.codigo}</td>
              <td>${valor.NomeDoTipo}</td>
              <td>${valor.Complemento ? valor.Complemento : "Sem nome"}</td>
              <td>${valor.NomeSala}</td>
              <td>${valor.Nome}</td>`;
    corpoTabela.appendChild(novaLista);
  });
  console.log("Dados da pesquisa:", filtrados);
  console.log("valor da barra", filtro.value);
}

barraPesquisa.addEventListener("input", () =>
  pesquisar(barraPesquisa.value, filtro.value)
);

editar.addEventListener("click", function () {
  // Adiciona o CSS (se ainda não tiver sido adicionado)
  if (!document.getElementById("estilo-linha")) {
    const style = document.createElement("style");
    style.id = "estilo-linha";
    style.textContent = `
        .linha {
          transition: ease 0.3s;
          cursor: pointer;
        }
        .linha:hover {
          background-color: var(--cinza-claro-2);
          transition: ease 0.3s;
        }
      `;
    document.head.appendChild(style);
  }
  selecionarObjetos();
  editar.style.display = "none";
  fechar.style.display = "flex";
});

fechar.addEventListener("click", function () {
  editar.style.display = "flex";
  fechar.style.display = "none";
  const estilo = document.getElementById("estilo-linha");
  estilo.remove();
  fecharSelecao();
});

async function selecionarObjetos() {
  corpoTabela.innerHTML = ``;
  const dados = await pegarDados();
  dados.forEach((element, index) => {
    corpoTabela.innerHTML += `<tr>
              <td class="linha" id="linha${index}">${element.codigo}</td>
              <td>${element.NomeDoTipo}</td>
              <td>${element.Complemento ? element.Complemento : "Sem nome"}</td>
              <td>${element.NomeSala}</td>
              <td>${element.Nome}</td>
               </tr>`;
  });
  function cliqueHandler(valor) {
    pegarDados().then((dados) => {
      const objetoSelecionado = dados.find(
        (item) => item.codigo.toString() === valor
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

  const codigo = document.querySelectorAll(".linha");
  codigo.forEach((linha) => {
    const clique = () => cliqueHandler(linha.textContent);
    linha.addEventListener("click", clique);
  });
}

async function fecharSelecao() {
  corpoTabela.innerHTML = ``;
  const dados = await pegarDados();
  dados.forEach((element, index) => {
    corpoTabela.innerHTML += `<tr>
              <td class="linha" id="linha${index}">${element.codigo}</td>
              <td>${element.NomeDoTipo}</td>
              <td>${element.Complemento ? element.Complemento : "Sem nome"}</td>
              <td>${element.NomeSala}</td>
              <td>${element.Nome}</td>
               </tr>`;
  });
  function cliqueHandler(valor) {
    pegarDados().then((dados) => {
      const objetoSelecionado = dados.find(
        (item) => item.codigo.toString() === valor
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
  const codigo = document.querySelectorAll(".linha");
  codigo.forEach((linha) => {
    const clique = () => cliqueHandler(linha.textcontent);
    linha.addEventListener("click", clique);
    linha.removeEventListener("click", clique);
  });
}

// codigo.forEach((element, index) =>{
//   codigo[index].addEventListener("click", function (){
//   console.log(element.value)})
// })

// 0: {codigo: 1234, NomeDoTipo: 'Computador', Nome: 'Ótimo', NomeSala: 'Sub. Macedo', Complemento: null}
// 1: {codigo: 1111, NomeDoTipo: 'Impressora', Nome: 'Ótimo', NomeSala: 'Copa', Complemento: null}
// 2: {codigo: 4444, NomeDoTipo: 'Computador', Nome: 'Ótimo', NomeSala: 'Tião Karate', Complemento: null}
// 3: {codigo: 2222, NomeDoTipo: 'Monitor', Nome: 'Bom', NomeSala: 'COTEC', Complemento: null}
// 4: {codigo: 3333, NomeDoTipo: 'Impressora', Nome: 'Ruim', NomeSala: 'Sala reunião', Complemento: null}
