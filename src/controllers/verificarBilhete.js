require('./corinthians');

module.exports = async function VerificaBanco(codigo){
    const result = await runQuery('SELECT COUNT(*) as COUNT FROM BILHETES WHERE codigo_bilhete = :id',[codigo]);
    //console.log(result.rows[0].COUNT);
    return result.rows[0].COUNT;
}