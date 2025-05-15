const barraPesquisa = document.getElementById("barra-pesquisa");
const corpoTabela = document.getElementById("corpo-tabela");
const filtro = document.getElementById("filtrar-por");

async function pegarDados() {
  const res = await fetch("/dados-buscar");
  const dados = await res.json();
  console.log("Dados", dados);
  return dados;
}

async function mostrarObjetos() {
  corpoTabela.innerHTML = ``;
  const dados = await pegarDados();
  dados.forEach((element) => {
    corpoTabela.innerHTML += `<tr>
              <td>${element.codigo}</td>
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

// 0: {codigo: 1234, NomeDoTipo: 'Computador', Nome: 'Ótimo', NomeSala: 'Sub. Macedo', Complemento: null}
// 1: {codigo: 1111, NomeDoTipo: 'Impressora', Nome: 'Ótimo', NomeSala: 'Copa', Complemento: null}
// 2: {codigo: 4444, NomeDoTipo: 'Computador', Nome: 'Ótimo', NomeSala: 'Tião Karate', Complemento: null}
// 3: {codigo: 2222, NomeDoTipo: 'Monitor', Nome: 'Bom', NomeSala: 'COTEC', Complemento: null}
// 4: {codigo: 3333, NomeDoTipo: 'Impressora', Nome: 'Ruim', NomeSala: 'Sala reunião', Complemento: null}
