function ConfirmationModalID(){
    let confirmation = document.getElementById("confirmation");
    if(!confirmation.classList.contains("modal-open")){
        confirmation.classList.add("modal-open");
    }
}
function CancelModalID(){
    let confirmation = document.getElementById("confirmation");
    confirmation.classList.remove("modal-open");
}
function ConfirmGerarID(){
    GerarID();
    CancelModalID();
}

function teste(){
    document.getElementById("codigoRecarga").textContent="não";
}

async function Recarregar(){
    const tipo = document.getElementById("tipoRecarga").value;
    var saldo=0;
    switch(tipo){
        case 'unico':
        saldo =1;
        break;

        case 'duplo':
        saldo =2;
        break;

        case 'semanal':
        saldo =7;
        break;

        case 'mensal':
        saldo =30;
        break;
    }
    const codigo = document.getElementById("inputID").value;
    try {
        await fetch(`http://localhost:8081/RecarregarBilhete/${codigo}/${tipo}/${saldo}`,{method:'POST'});
    } catch (error) {
        teste();
    }
    
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

