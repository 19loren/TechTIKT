require ('./corinthians');

function formatarData (data) {
    try{
        var dataString = data.getDate()  + "/" + (data.getMonth()+1) + "/" + data.getFullYear() + " " +
        data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
        return dataString;
    }catch(e){
        return "";
    }
  }

async function ExisteBilhete(codigo){
    const existeBilhete = await runQuery('SELECT count(*) as COUNT FROM bilhetes where codigo_bilhete = :id',[codigo])
    const existe = existeBilhete.rows[0].COUNT
    if(existe == 1) return true;
    return false;
  }
  
module.exports = async function testeHora(codigo){
    // const existe = await runQuery('select (datageracao_bilhete) from Bilhetes where codigo_bilhete = :id',[codigo]);
    var dados= [];
    var objGerenciamento = {tipo:"",dataGeracao:"",dataRecarga:"",dataUtilizacao:"",existe:false};
    if(await ExisteBilhete(codigo)){
        const existe = await runQuery(
            `select
                codigo_bilhete as COD,
                tipo_recarga as TIPO,
                datageracao_bilhete as DATA_GERARACAO,
                data_recarga AS DATA_RECARGA,
                dataativacao_bilhete as DATA_UTILIZACAO
            from bilhetes join recarga on bilhetes.codigo_bilhete = recarga.fk_codigo_bilhete
            join utilizacao on bilhetes.codigo_bilhete = utilizacao.fk_codigo_bilhete
            where codigo_bilhete = :id`,[codigo]);
            console.log(Object.keys(existe.rows).length);
        for (i in existe.rows){
            objGerenciamento={}
            // console.log(existe.rows[i]);
            //console.log(objGerenciamento);
            objGerenciamento.tipo = existe.rows[i].TIPO!=undefined ? existe.rows[i].TIPO :"";
            //console.log(objGerenciamento);
            objGerenciamento.dataGeracao = formatarData(existe.rows[i].DATA_GERARACAO);
            objGerenciamento.dataRecarga = formatarData(existe.rows[i].DATA_RECARGA);
            objGerenciamento.dataUtilizacao = formatarData(existe.rows[i].DATA_UTILIZACAO);
            objGerenciamento.existe=true;
            //console.log(objGerenciamento);
            dados.push(objGerenciamento);
            console.log(dados);
            console.log(i);
            // aqui deveria mandar pro front 
        }
        
       console.log(dados);
        return dados;
    }else{
        dados.push(objGerenciamento);
        return dados;
    }
    
    // console.log(formatarData(existe.rows[0].DATA_GERARACAO));
    // console.log(formatarData(existe.rows[0].DATA_RECARGA));
    // console.log(formatarData(existe.rows[0].DATA_UTILIZACAO));
    // objGerenciamento.tipo = existe.rows[0].TIPO;
    // objGerenciamento.dataGeracao = formatarData(existe.rows[0].DATA_GERARACAO);
    // objGerenciamento.dataRecarga = formatarData(existe.rows[0].DATA_RECARGA);
    // objGerenciamento.dataUtilizacao = formatarData(existe.rows[0].DATA_UTILIZACAO);
    // console.log(objGerenciamento);
}