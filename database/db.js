const sql = require('mssql');
let conexion = {};

    conexion = {
    user: process.env.DB_USER,
    password : process.env.DB_PASS,
    server: process.env.DB_HOST, // better stored in an app setting such as process.env.DB_SERVER
    port: process.env.DB_NAME, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database : process.env.DB_DATABASE, // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

conectarDB();
 
async function conectarDB() {
    try { 
      try {
        let pruebaConexion = await sql.connect(conexion);
        if (pruebaConexion) {
          let pool = pruebaConexion; 
          console.log('estoy en la primera conexion');
          return pool;
        } 
      } catch (error) {
        console.log("estoy en la segunda conexion"); 
        conexion = {
        user : process.env.DB_USER2,
        password : process.env.DB_PASS2,
        server: process.env.DB_HOST2, // better stored in an app setting such as process.env.DB_SERVER
        port: process.env.DB_NAME2, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
        database : process.env.DB_DATABASE2, // better stored in an app setting such as process.env.DB_NAME
        authentication: {
            type: 'default'
        },
        options: {
            encrypt: true
        }
      }
      }
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

module.exports = conexion;