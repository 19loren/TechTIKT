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
//#endregion


//#region VerificaBilhete
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
//#endregion

//#region RecarregarBilhete
async function RecarregarBilhete(tipo,saldo){
    VoltarMenu();
    await fetch(`http://localhost:8081/RecarregarBilhete/${tipo}/${saldo}`,{method:"POST"}).catch();
}
//#endregion


async function utilizar(){
    try {
        document.getElementById("lbl-res").textContent="";
        document.getElementById("lbl-sub").textContent="";
        document.getElementById("codigo").textContent="";
        const codigo = document.getElementById("inputUtilizacao").value;
        var dadosUtilizacao = await fetch(`http://localhost:8081/utilizar/${codigo}`,{method:'POST'}).then((dadosUtilizacao)=> dadosUtilizacao.json());
        if(dadosUtilizacao.existe==0){
            document.getElementById("lbl-res").textContent="Código Invalido!!!";
        }
        else if(dadosUtilizacao.menssagem === "Saldo insuficiente!!!"){
            document.getElementById("lbl-res").textContent=dadosUtilizacao.menssagem;
        }
        else if(dadosUtilizacao.menssagem ==="O bilhete ja esta ativo!!!"){
            document.getElementById("lbl-res").textContent="Catraca Liberada!!!";
            document.getElementById("lbl-sub").textContent=dadosUtilizacao.menssagem;
            document.getElementById("codigo").textContent='Validade: '+dadosUtilizacao.dataExpiracao;
        }
        else if(dadosUtilizacao.menssagem ==="Ativo!!!"){
            document.getElementById("lbl-res").textContent="Catraca Liberada!!!";
            document.getElementById("lbl-sub").textContent=dadosUtilizacao.menssagem;
            document.getElementById("codigo").textContent='Validade: '+dadosUtilizacao.dataExpiracao;
        }
        toggleModal();
    }catch (error) {
        console.log(error);
    }
}

const toggleModal=() =>{
    const sectionBilheteGerado= document.querySelector("#section__modal__gerado");
    sectionBilheteGerado.classList.toggle("hide")
}

//"existe":"0", "menssagem":"coreinthians","dataExpiracao":""