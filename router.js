const express = require('express');
const router = express.Router();
const sql = require('mssql');

const config = require('./database/db');

//MOSTRAR todos los registros
router.get('/', async (req, res) => {
  try {
    await sql.connect(config);

    const request = new sql.Request();
    const query = 'SELECT * FROM productos';

    const result = await request.query(query);
    const results = result.recordset;

    res.render('index', { results: results });
  } catch (error) {
    // Manejar el error de conexión o consulta
    console.error(error);
    res.status(500).send('Error al consultar la base de datos');
  } finally {
    sql.close();
  }
});
  
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
      res.redirect('/');
      sql.close();
    } catch (error) {
      // Manejar el error de conexión o consulta
      console.error(error);
      res.status(500).send('Error al eliminar el registro');
    }
  });

  
  const crud = require('./controllers/crud');
  router.post('/save', crud.save);
  
  router.post('/update', crud.update);
  
  module.exports = router;


