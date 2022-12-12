require('./corinthians');

module.exports = async function Recarregar(codigo,tipoRecarga,saldoRecarga){
  await runQuery('UPDATE Bilhetes SET saldo_bilhete=:id where codigo_bilhete=:id',[saldoRecarga,codigo]);
  await runQuery('insert into recarga(data_recarga,tipo_recarga,FK_CODIGO_BILHETE) values(sysdate,:id,:id)',[tipoRecarga,codigo]);
}
