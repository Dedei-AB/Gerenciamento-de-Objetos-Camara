const tabela = document.getElementById("tabela");

async function pegarDados() {
  const res = await fetch("/dados-buscar");
  const dados = await res.json();
  return dados;
}

const nomeObjeto = async () => {
  const dados = await pegarDados();
  dados.forEach((element) => {
    tabela.innerHTML += `<tr>
              <td>${element.codigo}</td>
              <td>${element.Complemento}</td>
              <td>${element.Complemento}</td>
              <td>${element.NomeSala}</td>
              <td>${element.Nome}</td>
            </tr>`;
  });
};

nomeObjeto();

// Complemento: "monitor"
// Nome: "ótimo"
// NomeDoTipo: "monitor"
// NomeSala: "COTEC"
// codigo: 1234
