require('./corinthians');

var data = new Date();
var saldonew = 0;
var objetoJson={"existe":"0", "menssagem":"coreinthians","dataExpiracao":""}

function formatarData (data) {
  var dataString = data.getDate()  + "/" + (data.getMonth()+1) + "/" + data.getFullYear() + " " +
  data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  return dataString;
}
// 16/02/2022 18:05:34  

function addHoursToDate(dateObj,intHour){
  var numberOfM1Seconds = dateObj.getTime();
  var addMlSeconds = (intHour * 60) * 60 * 1000;
  var newDateObj = new Date(numberOfM1Seconds + addMlSeconds);

  return newDateObj;
}

async function ExisteBilhete(codigo){
  const existeBilhete = await runQuery('SELECT count(*) as COUNT FROM bilhetes where codigo_bilhete = :id',[codigo])
  const existe = existeBilhete.rows[0].COUNT
  if(existe == 1) return true;
  return false;
}

async function ExisteUtilização(codigo){
  const existeUtilizacao = await runQuery('SELECT count(*) as COUNT FROM utilizacao where FK_CODIGO_BILHETE = :id',[codigo])
  const existe = existeUtilizacao.rows[0].COUNT
  if(existe == 1) return true;
  return false;
}

async function inserir(codigo,saldo){
  var tempo;
  switch(saldo){
    case 1:
      tempo = 0.667;
      break;
    case 2:
      tempo = 0.667;
      saldonew = 1;
      break;
    case 7:
      tempo = 168;
      break;
    case 30:
      tempo = 720;
      break;
  }
  console.log(tempo);
  var dataAtivacao = formatarData(data);
  var dataExpiracao = formatarData(addHoursToDate(data,tempo));
  console.log(dataAtivacao);
  console.log(saldonew);
  await runQuery('insert into utilizacao(DATAATIVACAO_BILHETE,DATAEXPIRACAO_BILHETE,FK_CODIGO_BILHETE) values (:id,:id,:id)',[dataAtivacao,dataExpiracao,codigo]);
  await runQuery('UPDATE Bilhetes SET saldo_bilhete=:id where codigo_bilhete = :id',[saldonew,codigo]);
  saldonew=0;
  tempo=0;
  objetoJson.dataExpiracao = dataExpiracao;              
}

module.exports=async function inserirUtilizacao(codigo){

  if(await ExisteBilhete(codigo)){
    objetoJson.existe=1;
    const selectSaldo = await runQuery('SELECT saldo_bilhete FROM bilhetes WHERE codigo_bilhete = :id',[codigo]);
    var saldo = selectSaldo.rows[0].SALDO_BILHETE
    if(saldo != 0 && saldo != null){
      if(await ExisteUtilização(codigo)){
        const expSelect = await runQuery('SELECT dataexpiracao_bilhete from utilizacao where FK_CODIGO_BILHETE = :id ORDER BY dataexpiracao_bilhete desc',[codigo]);
        if(expSelect.rows[0].DATAEXPIRACAO_BILHETE <= data){
          await inserir(codigo,saldo);
          objetoJson.menssagem="Ativo!!!";
        }else{
          objetoJson.menssagem="O bilhete ja esta ativo!!!";
          var dataExpiracao = formatarData(expSelect.rows[0].DATAEXPIRACAO_BILHETE);
          objetoJson.dataExpiracao = dataExpiracao;
        }
      }else{
        await inserir(codigo,saldo);
        objetoJson.menssagem="Ativo!!!";
      }
    }else{
      objetoJson.menssagem="Saldo insuficiente!!!";
    }
    return objetoJson;
  }
  return objetoJson;
} 
  

    
//     if(count == 1){
//       if(saldo != 0 && saldo != null){
//         if(countUti != 0){
//           const expSelect = await runQuery('SELECT dataexpiracao_bilhete from utilizacao where codigo_bilhete = :id',[codigo]);
//           if(expSelect.rows[0].DATAEXPIRACAO_BILHETE <= data){
//             switch(saldo){
//               case '1':
//                 tempo = 0.667;
//               case '2':
//                 tempo = 0.667;
//                 var saldonew = 1;
//               case '7':
//                 tempo = 168;
//               case '30':
//                 tempo = 720;
//             }
//             var dataAtivacao = formatarData(data);
//             var dataExpiracao = formatarData(addHoursToDate(data,tempo));
//             await runQuery('insert into utilizacao(DATAATIVACAO_BILHETE,DATAEXPIRACAO_BILHETE,FK_CODIGO_BILHETE) values (:id,:id,:id)',[dataAtivacao,dataExpiracao,codigo]);
//             await runQuery('UPDATE Bilhetes SET saldo_bilhete=:id where codigo_bilhete = :id'[saldonew,codigo]);
//             objeto.dataExpiracao = dataExpiracao;
//           }else{
//             var dataExpiracao = formatarData(addHoursToDate(data,tempo));
//             objeto.dataExpiracao = dataExpiracao;
//           }
//         }else{
//           switch(saldo){
//             case '1':
//               tempo = 0.667;
//             case '2':
//               tempo = 0.667;
//               var saldonew = 1;
//             case '7':
//               tempo = 168;
//             case '30':
//               tempo = 720;
//           }
//           var dataAtivacao = formatarData(data);
//           var dataExpiracao = formatarData(addHoursToDate(data,tempo));
//           await runQuery('insert into utilizacao(DATAATIVACAO_BILHETE,DATAEXPIRACAO_BILHETE,FK_CODIGO_BILHETE) values (:id,:id,:id)',[dataAtivacao,dataExpiracao,codigo]);
//           await runQuery('UPDATE Bilhetes SET saldo_bilhete=:id where codigo_bilhete = :id'[saldonew,codigo]);
//           objeto.dataExpiracao = dataExpiracao;
//         }
//       }else{
//         objeto.message = 'Você não possui uma recarga válida!';
//       }
//       return objeto;
//     }else{
//       objeto.message = 'Bilhete Inválido!';
//       return objeto;
//     }
// }


// module.exports = inserirUtilizacao();