
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


async function Recarregar(tipo,saldo){
    try {
        const response = await fetch(`http://localhost:8081/RecarregarBilhete/${codigoRecarga}/${tipo}/${saldo}`,{method:'POST'}).then((existe)=> existe.json());
        const count = response.COUNT
        if (count == 1){
            document.getElementById("InputID").innerHTML =('O bilhete '+codigo+' foi recarregado com sucesso');
        }else{
            document.getElementById("InputID").innerHTML = "código invalido";
        }
    } catch (error) {
        console.log(error);
    }
}


async function VerificarBilhete(){
    var codigoRecarga = document.getElementById("inputRecarga").value;
    if(codigoRecarga==""){
        document.querySelector("#inputRecarga").setAttribute("placeholder","Código Invalido!");
    }else{
        let existe = await fetch(`http://localhost:8081/VerificarBilhete/${codigoRecarga}`,{method:"POST"}).then((existe)=>existe.json());
        if(existe==1){
            window.location.href = "http://localhost:8081/planos";
        }else{
            document.getElementById("inputRecarga").value="";
            document.querySelector("#inputRecarga").setAttribute("placeholder","Código Invalido!");
        }
    }
}

async function Recarga(tipo,saldo){
    await fetch(`http://localhost:8081/plano/${codigoRecarga}/${tipo}/${saldo}`,{method:'POST'});
}

async function utilizar(){
    try {
        const codigo = document.getElementById("inputUtilizacao").value;
        const response = await fetch(`http://localhost:8081/utilizacao/${codigo}`,{method:'POST'}).then((existe)=> existe.json());
        const count = response.COUNT
        if(count == 1){
            document.getElementById("codigoVerificado").innerHTML = 'Catraca Liberada !!!';
        }else{
            document.getElementById("codigoVerificado").innerHTML ='Você não possui saldo, vá até um terminal para recarrega-lo';
        }
    }catch (error) {
        console.log(error);
    }
}


