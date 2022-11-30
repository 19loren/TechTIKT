require('./corinthians');

module.exports = async function recarregar(codigo,tipoRecarga,saldoRecarga){
  await runQuery('UPDATE Bilhetes SET tipo_bilhete=:id,saldo_bilhete=:id where codigo_bilhete=:id',[tipoRecarga,saldoRecarga,codigo]);
  await runQuery('insert into recarga values(:id, sysdate,:id,:id)',[codigo,tipoRecarga,codigo]);
}
