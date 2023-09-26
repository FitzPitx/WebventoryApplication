const config = require('../database/db');
const sql = require('mssql');
const express = require('express');



exports.show = async (req, res) => {
    try {
      await sql.connect(config);
  
      const request = new sql.Request();
      const query = 'SELECT * FROM productos';
  
      const result = await request.query(query);
      const results = result.recordset;
  
      res.render('show', { results: results });
    } catch (error) {
      // Manejar el error de conexión o consulta
      console.error(error);
      res.status(500).send('Error al consultar la base de datos');
    } finally {
      sql.close();
    }
  };
//RUTA PARA GUARDAR UN REGISTRO
exports.save = async (req, res) => {
    const nombreProducto = req.body.nombre_producto;
    const descripcionProducto = req.body.descrip_producto;
    const cantidadProducto = req.body.cant_producto;
    const precioProducto = req.body.precio_producto;
    insertarProducto(nombreProducto, descripcionProducto, cantidadProducto, precioProducto);
    async function insertarProducto(nombreProducto, descripcionProducto, cantidadProducto, precioProducto){
        let pool;
        try{
            pool = await sql.connect(config);
            const request = new sql.Request();
            const query = `INSERT INTO productos (nombre_producto, descrip_producto, cant_producto, precio_producto) VALUES (@nombre_producto, @descrip_producto, @cant_producto, @precio_producto)`;
            request.input('nombre_producto', sql.VarChar, nombreProducto);
            request.input('descrip_producto', sql.VarChar, descripcionProducto);
            request.input('cant_producto', sql.Int, cantidadProducto);
            request.input('precio_producto', sql.Int, precioProducto);
            const result = await request.query(query);
            console.log("Registro exitoso ",result);
        }  catch (error){ 
            console.log('Error al insertar el registro ', error);
        } finally{
            if (pool){
                pool.close();
            }
        }
    }
    res.redirect('/show');
}  



//RUTA PARA EDITAR UN REGISTRO
exports.update = async(req, res)=>{
    const id = req.body.id;
    const nombreProducto = req.body.nombre_producto;
    const descripcionProducto = req.body.descrip_producto;
    const cantidadProducto = req.body.cant_producto;
    const precioProducto = req.body.precio_producto;

    actualizarProducto(id, nombreProducto, descripcionProducto, cantidadProducto, precioProducto);
    
 
    async function actualizarProducto(id, nombreProducto, descripcionProducto, cantidadProducto, precioProducto){
        let pool;
        try{
            pool = await sql.connect(config);
            const request = new sql.Request();
            const query = `UPDATE productos SET nombre_producto = @nombre_producto, descrip_producto = @descrip_producto, cant_producto = @cant_producto, precio_producto = @precio_producto WHERE id = @id`;
            request.input('id', sql.Int, id);
            request.input('nombre_producto', sql.VarChar, nombreProducto);
            request.input('descrip_producto', sql.VarChar, descripcionProducto);
            request.input('cant_producto', sql.Int, cantidadProducto);
            request.input('precio_producto', sql.Int, precioProducto);
            const result = await request.query(query);
            console.log("Registro actualizado ",result);
        }  catch (error){
            console.log('Error al actualizar el registro ', error);
        } finally{
            if (pool){
                pool.close();
            }
        }
    }
    res.redirect('/show');
}