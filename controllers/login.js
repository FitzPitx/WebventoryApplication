const config = require('../database/db');
const sql = require('mssql');
const express = require('express');
const bcrypt = require('bcryptjs');

//Registro de usuarios
exports.registerUser = async (req, res)=>{
    const id = 2;
    const user = req.body.user;
	  const name = req.body.name;
    const role = req.body.rol;
	  const pass = req.body.pass;
	  let passwordHash = await bcrypt.hash(pass, 8);
    registarUsuario(user, name, role, passwordHash);

    async function registarUsuario(user, name, role, passwordHash){
      let pool;
      try {
      pool = await sql.connect(config);
      const request = new sql.Request();
      const query = `INSERT INTO users ( username, name, role, password) VALUES ( @user, @name, @role, @passwordHash)`;
      // request.input('id', sql.Int, id);
      request.input('user', sql.VarChar, user); 
      request.input('name', sql.VarChar, name);
      request.input('role', sql.VarChar, role);
      request.input('passwordHash', sql.VarChar, passwordHash);
      const result = await request.query(query);
      const results = result.recordset;
      console.log("Registro exitoso ",results);
      res.render('login');

      }catch (error){  
        console.error(error);
        res.status(500).send('Error al consultar la base de datos');
      } finally {
        sql.close();
      }
    }
 }; 

 // INICIO DE SESIÓN
exports.auth = async (req, res) => {
	const user = req.body.user;
	const pass = req.body.pass;  

	authUser(user, pass);
	async function authUser(user,pass){
	  let pool;
	  pool = await sql.connect(config);
	  const request = new sql.Request();
	  const query = `SELECT * FROM users WHERE username = @user`;
	  request.input('user', sql.VarChar, user); 
	  request.input('pass', sql.VarChar, pass);
	  const results = await request.query(query);

	  usuarioEncontrado = results.recordset[0];
	  if (user && pass) {
		if( results.recordset.length === 0 || !(await bcrypt.compare(pass, usuarioEncontrado.password)) ) {    
		  res.render('login', {
						  alert: true,
						  alertTitle: "Error",
						  alertMessage: "USUARIO y/o PASSWORD incorrectas",
						  alertIcon:'error',
						  showConfirmButton: true,
						  timer: false,
						  ruta: 'login'    
					  });			
		}  else {         
				  //creamos una var de session y le asignamos true si INICIO SESSION       
				  req.session.loggedin = true;                
				  req.session.name = usuarioEncontrado.name;
				  res.render('login', {
					  alert: true,
					  alertTitle: "Conexión exitosa",
					  alertMessage: "¡LOGIN CORRECTO!",
					  alertIcon:'success',
					  showConfirmButton: false,
					  timer: 1500,
					  ruta: ''
			
				  });        			
			  }
			  res.end();  			
	  }else {	
		res.send('Please enter user and Password!');
		res.end();
	  }
	}
  };

exports.validarSesion =  (req, res)=> {
	if (req.session.loggedin) {
		res.render('index',{
			login: true,
			name: req.session.name			
		});		
	} else {
		res.render('index',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
};