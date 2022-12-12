//#region GerarBilhete
VoltarMenu =() =>{
    window.location.href ="http://localhost:8081/";
}

GerarBilhete =() =>{
    const sectionBilheteGerado= document.querySelector("#section__modal__gerado");
    if (document.getElementById("rub").checked == false || document.getElementById("tdu").checked == false) {
        document.getElementById("lbl-aceite-false").textContent = "Você precisa aceitar os termos de uso!";
        return null;
    }
    GerarID();
    sectionBilheteGerado.classList.toggle("hide");
}

async function GerarID() {
    var result           = '';
    var characters       = '123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    document.getElementById("codigo").textContent='Seu Código é: '+result;
    await fetch(`http://localhost:8081/gerarBilhete/${result}`,{method:'POST'}).catch();
}

const toggleModalRegraU=() =>{
    const sectionBilheteGerado= document.querySelector("#section__rub");
    sectionBilheteGerado.classList.toggle("hide")
}
const toggleModalTermosU=() =>{
    const sectionBilheteGerado= document.querySelector("#section__tdu");
    sectionBilheteGerado.classList.toggle("hide")
}

//#endregion


//#region RecarregarBilhete
async function VerificarBilhete(){
    const codigoRecarga = document.getElementById("inputRecarga").value;
    if(codigoRecarga==""){
        document.querySelector("#inputRecarga").setAttribute("placeholder","Código Invalido");
    }
    else{
        let existe = await fetch(`http://localhost:8081/VerificarBilhete/${codigoRecarga}`,{method:"POST"}).then((existe)=> existe.json());
        if(existe==1){
            window.location.href ="http://localhost:8081/planos";
        }
        else{
            document.getElementById("inputRecarga").value="";
            document.querySelector("#inputRecarga").setAttribute("placeholder","Código Invalido");
        }
    }
}

async function RecarregarBilhete(tipo,saldo){
    toggleRecarregado();
    await fetch(`http://localhost:8081/RecarregarBilhete/${tipo}/${saldo}`,{method:"POST"}).catch();
}

const toggleRecarregado=() =>{
    const sectionBilheteGerado= document.querySelector("#section__recargaef");
    sectionBilheteGerado.classList.toggle("hide")
}


//#endregion

//#region UtilizarBilhete
async function utilizar(){
    try {
        const codigoUtilizacao = document.getElementById("inputUtilizacao").value;
        if(codigoUtilizacao==""){
            document.querySelector("#inputUtilizacao").setAttribute("placeholder","Código Inválido!!!");
        }else{
            document.getElementById("lbl-res").textContent="";
            document.getElementById("lbl-sub").textContent="";
            document.getElementById("codigo").textContent="";
            const codigo = document.getElementById("inputUtilizacao").value;
            var dadosUtilizacao = await fetch(`http://localhost:8081/utilizar/${codigo}`,{method:'POST'}).then((dadosUtilizacao)=> dadosUtilizacao.json());
            if(dadosUtilizacao.existe==0){
                document.getElementById("inputUtilizacao").value="";
                document.querySelector("#inputUtilizacao").setAttribute("placeholder","Código Inválido!!!");
                return null;
            }
            else if(dadosUtilizacao.menssagem === "Saldo insuficiente!!!"){
                document.getElementById("lbl-res").textContent="SALDO INSUFICIENTE!";
                document.getElementById("lbl-sub").textContent="Recarregue seu Bilhete TechTIKT.";
                document.getElementById("codigo").textContent='';
            }
            else if(dadosUtilizacao.menssagem ==="O bilhete ja esta ativo!!!"){
                document.getElementById("lbl-res").textContent="O BILHETE ESTÁ ATIVO";
                document.getElementById("lbl-sub").textContent="Catraca Liberada!!";
                document.getElementById("codigo").textContent='Validade: '+dadosUtilizacao.dataExpiracao;
            }
            else if(dadosUtilizacao.menssagem ==="Ativo!!!"){
                document.getElementById("lbl-res").textContent="Catraca Liberada!!!";
                document.getElementById("lbl-sub").textContent=dadosUtilizacao.menssagem;
                document.getElementById("codigo").textContent='Validade: '+dadosUtilizacao.dataExpiracao;
            }
            toggleModal();
    }
    }catch (error) {
        console.log(error);
    }
}

const toggleModal=() =>{
    const sectionBilheteGerado= document.querySelector("#section__modal__gerado");
    sectionBilheteGerado.classList.toggle("hide")
}

//#endregion

//#region GerenciarBilhete
const adicionarLinha=(plano,dataGeracao,dataRecarga,dataUtilizaca) =>{
    let li=document.createElement('li');
    li.className='mt-teste'
    li.innerHTML =`
    <div class="mt-pgru">
        <p class="txt-plano">${plano}</p>
    </div>
    <div class="mt-pgru">
        <p class="txt-dru">${dataGeracao}</p>
    </div>
    <div class="mt-pgru">
        <p class="txt-dru">${dataRecarga}</p>
    </div>
    <div class="mt-pgru">
        <p class="txt-dru">${dataUtilizaca}</p>
    </div>
    <hr size="3"></hr>`
    document.querySelector('.ul-mt').appendChild(li);
}


async function GerenciarBilhete(){
    const codigo=document.getElementById("inputUtilizacao").value;
    var dadosGerenciar = await fetch(`http://localhost:8081/gerenciar/${codigo}`,{method:'POST'}).then((dadosGerenciar)=> dadosGerenciar.json());
    console.log(dadosGerenciar);
    if(dadosGerenciar[0].existe){
        for(dado in dadosGerenciar){
            console.log(dadosGerenciar[dado].tipo);
            adicionarLinha(dadosGerenciar[dado].tipo,dadosGerenciar[dado].dataGeracao,dadosGerenciar[dado].dataRecarga,dadosGerenciar[dado].dataUtilizacao);
        }
    }else{
        document.getElementById("inputUtilizacao").value="";
        document.getElementById("inputUtilizacao").setAttribute("placeholder","Código Invalido");
    }
}
//#endregion

