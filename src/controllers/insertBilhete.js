require('./corinthians');

module.exports = async function inserirBilhete(codigo){
  await runQuery('insert into bilhetes(codigo_bilhete,datageracao_bilhete) values(:id,sysdate)',[codigo]);
}; 
