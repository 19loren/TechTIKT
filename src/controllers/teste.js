require ('./dbConexao');

module.exports = async function testeHora(codigo){
    const existe = await runQuery('select (datageracao_bilhete) from Bilhetes where codigo_bilhete = :id',[codigo]);
    //console.log(existe.rows[0]);
    //console.log(existe.rows[0].DATAGERACAO_BILHETE);

    dataa = new Date();
    console.log(dataa);

    if(existe.rows[0].DATAGERACAO_BILHETE <= dataa){
        //console.log('QUERO MEL');
    }else{
        //console.log('QUERO CRIS');
    }
}