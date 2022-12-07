process.env.ORA_SDTZ = 'America/Bahia';
// SÓ FUNCIONA COM O NOME CORINTHIANS 
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

module.exports = runQuery = async (query, params) => {

  let connection;

  try {
      connection = await oracledb.getConnection(dbConfig)

      const result = await connection.execute(query, params);

      return result;
  } catch (error) {
      return error.message;
  } finally {
      if (connection) {
          try {
              await connection.close();
          } catch (error) {
              return error.message;
          }
      }
  }
}
