require('./corinthians');

module.exports = async function VerificaBanco(codigo){
    const result = await runQuery('SELECT (codigo_bilhete) FROM BILHETES WHERE codigo_bilhete = :id',[codigo]);
    console.log(result.rows[0]);
    if (result.rows[0] != undefined){
        return true;
    }else{
        return false;
    }
}