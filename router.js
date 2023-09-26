const express = require('express');
const router = express.Router();
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const config = require('./database/db');
const crud = require('./controllers/crud');
const login = require('./controllers/login');

router.get('/login',(req, res)=>{
  res.render('login');
})

router.get('/register',(req, res)=>{
  res.render('register');
})

// REGISTRO DE USUARIOS
router.post('/register',login.registerUser);

// INICIO DE SESIÓN
router.post('/auth',login.auth);

//Validar inicio de sesión en todas las páginas
router.get('/',login.validarSesion);


//función para limpiar la caché luego del logout
router.use(function(req, res, next) {
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

//Logout -- Destruye la sesión.
router.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});

  
// RUTA PARA MOSTRAR TODOS LOS REGISTROS
router.get('/show',crud.show);

//CREAR UN REGISTRO NUEVO
router.get('/create', async (req, res) => {
    res.render('create');
});
  

  //RUTA PARA EDITAR UN REGISTRO
  router.get('/edit/:id', async (req, res) => {
    let pool;
    try {
      const id = req.params.id;
      pool = await sql.connect(config);
  
      const request = new sql.Request();
      request.input('id', sql.Int, id);
  
      const query = 'SELECT * FROM productos WHERE id = @id';
      const result = await request.query(query);
  
      const product = result.recordset[0];

      res.render('edit', { product: product });
    } catch (error) {
      // Manejar el error de conexión o consulta
      console.error(error);
      res.status(500).send('Error al consultar la base de datos');
    } finally {
      if (pool) {
        pool.close();
      }
    }
  });
  
  //RUTA PARA ELIMINAR UN REGISTRO
  router.get('/delete/:id', async (req, res) => {
    let pool;
    try {
      pool = await sql.connect(config);
      const id = req.params.id;
      
      const request = new sql.Request();
      request.input('id', sql.Int, id);

      const query = 'DELETE FROM productos WHERE id = @id';
      const result = await request.query(query);

      console.log('Registro eliminado');
      res.redirect('/show');
      sql.close();
    } catch (error) {
      // Manejar el error de conexión o consulta
      console.error(error);
      res.status(500).send('Error al eliminar el registro');
    }
  });

  
 
  router.post('/save', crud.save);
  
  router.post('/update', crud.update);
  
  module.exports = router;


