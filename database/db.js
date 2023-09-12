const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'inventario'
});

conexion.connect((err)=>{
    if(err){
        console.log('Error connecting to database' + err);
        return
    }
    console.log('Connection established');
});

module.exports = conexion;