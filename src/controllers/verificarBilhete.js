require('./corinthians');

module.exports = async function VerificaBanco(codigo){
    const existe = await runQuery('SELECT count(*) as COUNT FROM bilhetes where codigo_bilhete = :id',[codigo]);
    return existe.rows[0].COUNT;
}