require('./corinthians');

module.exports = async function utilizar(codigo,saldoUtilizado){
  await runQuery('UPDATE Bilhetes SET saldo_bilhete=:id where codigo_bilhete=:id',[saldoUtilizado,codigo]);
  await runQuery('insert into utilizacao values(sysdate,:id)',[codigo]);
}
