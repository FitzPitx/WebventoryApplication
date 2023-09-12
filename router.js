const express = require('express');
const router = express.Router();


const conexion = require('./database/db');

//MOSTRAR todos los registros
router.get('/', (req, res)=>{
    conexion.query('SELECT * FROM productos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index', {results: results});
        }
    })
});

//CREAR UN REGISTRO NUEVO
router.get('/create', (req, res)=>{
    res.render('create');
});

//RUTA PARA EDITAR UN REGISTRO
router.get('/edit/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM productos WHERE id = ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {product: results[0]});
        }
    })
});

//RUTA PARA ELIMINAR UN REGISTRO
router.get('/delete/:id', (req, res)=> {
    const id = req.params.id;
    conexion.query('DELETE FROM productos WHERE id = ?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/');
        }
    });
});
    const crud = require('./controllers/crud');
    router.post('/save', crud.save);

    router.post('/update', crud.update);

    module.exports = router;

