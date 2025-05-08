const concluido = document.getElementById("concluido");
const piso = document.getElementById("piso");
const obj = document.getElementById("obj");
const complemento = document.getElementById("complemento");
const local = document.getElementById("Local");
const estado = document.getElementById("estado");

function Info() {
    let con = concluido.value;
    let pis = piso.value;
    let bj = obj.value;
    let lol = local.value;
    let est = estado.value;
    let comp = complemento.value;

    if (con == 0 || pis == 0 || bj == 0 || lol == 0 || est == 0) {
        alert('Coloque as informações corretas');
    } else {
        const dados = {
            concluido: con,
            piso: pis,
            objeto: bj,
            local: lol,
            estado: est,
            complemento: comp
        };

        console.log('Tudo certo!');
        console.log(dados); // aqui você pode mandar pro servidor
    }
}

function gerarNumeroAleatorio() {
    return Math.floor(1 + Math.random() * 9000);
}
document.getElementById("numero").textContent = gerarNumeroAleatorio();

const locaisPorPiso = {
    piso1: ["Gabinete", "Plenário"],
    piso2: ["COTEC"],
    garagem: ["Copa"]
};

function atualizarLocais() {
    const pisoSelecionado = document.getElementById("piso").value;
    const localSelect = document.getElementById("Local");

    localSelect.innerHTML = '<option value="">Selecionar</option>';

    if (locaisPorPiso[pisoSelecionado]) {
        locaisPorPiso[pisoSelecionado].forEach(local => {
            const option = document.createElement("option");
            option.value = local;
            option.textContent = local;
            localSelect.appendChild(option);
        });
    }
}
