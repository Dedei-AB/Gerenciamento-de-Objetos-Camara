const id = document.getElementById("objetoID")
const informacoes = getElementById("informacoes")


async function pegarObjetos() {
    const resposta = await fetch("/dados-buscar")
    const dados = await resposta.json()
    console.log(dados)
    return dados
}

pegarObjetos()

const atualizarObjeto = async() =>{
    const dados = await pegarObjetos()
    dados.forEach(element => {
        if(element.codigo == id){
            informacoes.innerHTML = `
          <label class="descrição-input" for="estadoObjeto">Estado do objeto</label>
          <select class="input-atualizar" name="estado" id="estadoObjeto">
              <option value="${element.Nome}">Ótimo</option>
              <option value="${element.Nome}">Bom</option>
              <option value="Ruim">Ruim</option>
          </select><br><br>

          <div class="lugares">
                <label class="descrição-input" for="piso">Selecione o Piso:</label>
                <br>
                <select class="input-atualizar" id="piso" onchange="filtrarLugares()">
                  <option value="">${element.ome}</option>
                  <option value="piso1">Piso 1</option>
                  <option value="piso2">Piso 2</option>
                  <option value="Garagem">Garagem</option>
                </select>
              </div><br>
          
              <div class="lugares">
                <label class="descrição-input" for="busca">Digite o nome do lugar:</label>
                <input class="input-atualizar" type="text" id="busca" placeholder="Ex: Sala de reunião" oninput="filtrarLugares()">
              </div>
          
              <div class="lugares" >
                <div class="lugar piso1" id="Recepcao">Recepção</div>
                <div class="lugar piso1" id="SalaLeitura">Sala de Leitura</div>
                <div class="lugar piso1" id="Auditorio">Auditório</div>
          
                <div class="lugar piso2" id="Laboratorio">Laboratório</div>
                <div class="lugar piso2" id="COTEC">COTEC</div>
                <div class="lugar piso2" id="salaReuniao">Sala de Reunião</div>

                <div class="lugar Garagem" id="Garagem">Garagem</div>                

              </div>
              
              <div id="selecionado" style="display:none; color: white; margin-top: 10px;"></div>


              <button class="atualizar" type="submit">Atualizar</button>
`
        }
        
    });
}
