const mysql = require('mssql');
const conexion = {
    user: 'andresAdmin', // better stored in an app setting such as process.env.DB_USER
    password: 'Sandia2408$!', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'mysqlserverandrew2408.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'inventario', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

conexion.connect((err)=>{
    if(err){
        console.log('Error connecting to database' + err);
        return
    }
    console.log('Connection established');
});

module.exports = conexion;