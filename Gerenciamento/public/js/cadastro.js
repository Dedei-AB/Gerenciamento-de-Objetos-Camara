 //Pop-up

    document.getElementById("concluido-cadastro").addEventListener("click", function () {
    const obj = document.getElementById("obj-cadastro").value.trim();
    const complemento = document.getElementById("complemento-cadastro").value.trim();
    const estado = document.getElementById("estado-cadastro").value.trim();
    const piso = document.getElementById("piso-cadastro").value.trim();
    const local = document.getElementById("local-cadastro").value.trim();

    if (!obj || !complemento || !estado || !piso || !local) {
        alert("Por favor, preencha todos os campos antes de concluir o cadastro.");
    } else {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "buscar.html"; 
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Mapas de locais por piso
    const locaisPorPiso = {
        piso1: ["Gabinete", "Plenário"],
        piso2: ["COTEC"],
        garagem: ["Copa"]
    };

    // Atualiza as opções de local de acordo com o piso selecionado
    function atualizarLocais() {
        const pisoSelecionado = document.getElementById("piso-cadastro").value;
        const localSelect = document.getElementById("local-cadastro");

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

    document.getElementById("piso-cadastro").addEventListener("change", atualizarLocais);

    // Geração de código aleatório via backend
    let codigoGerado = "";

    async function gerarCodigo() {
        try {
            const res = await fetch("http://localhost:3000/codigo");
            const data = await res.json();
            codigoGerado = data.codigo;

            document.getElementById("numero").textContent = codigoGerado;
            document.getElementById("codigoInput-cadastro").value = codigoGerado;
        } catch (error) {
            console.error("Erro ao gerar código:", error);
            alert("Erro ao gerar código automático.");
        }
    }

    // Envio do formulário para o backend
    document.getElementById("concluido-cadastro").addEventListener("click", async function () {
        const obj = document.getElementById("obj-cadastro").value.trim();
        const complemento = document.getElementById("complemento-cadastro").value.trim();
        const estado = document.getElementById("estado-cadastro").value.trim();
        const piso = document.getElementById("piso-cadastro").value.trim();
        const local = document.getElementById("local-cadastro").value.trim();

        if (!obj || !complemento || !estado || !piso || !local) {
            alert("Por favor, preencha todos os campos antes de concluir o cadastro.");
            return;
        }

        const payload = {
            codigo: document.getElementById("codigoInput-cadastro").value,
            tipoObjeto: obj,
            status: estado,
            sala: local,
            complemento: complemento
        };

        try {
            const res = await fetch("http://localhost:3000/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            alert(data.mensagem || data.erro);

            if (!data.erro) {
                window.location.href = "busca.html";
            }
        } catch (error) {
            console.error("Erro ao enviar cadastro:", error);
            alert("Erro ao cadastrar objeto.");
        }
    });

    // Executar ao carregar a página
    gerarCodigo();
});
