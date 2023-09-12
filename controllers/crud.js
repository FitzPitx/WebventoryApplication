const conexion = require('../database/db');

exports.save = (req, res)=>{
    const nombreProducto = req.body.nombre_producto;
    const descripcionProducto = req.body.descrip_producto;
    const cantidadProducto = req.body.cant_producto;
    const precioProducto = req.body.precio_producto;
    conexion.query('INSERT INTO productos SET ?',{nombre_producto: nombreProducto,
        descrip_producto: descripcionProducto,
        cant_producto: cantidadProducto,
        precio_producto: precioProducto}, (error, results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });
    }

exports.update = (req, res)=>{
    const id = req.body.id;
    const nombreProducto = req.body.nombre_producto;
    const descripcionProducto = req.body.descrip_producto;
    const cantidadProducto = req.body.cant_producto;
    const precioProducto = req.body.precio_producto;
    conexion.query('UPDATE productos SET ? WHERE id = ?',
        [{  nombre_producto: nombreProducto,
            descrip_producto: descripcionProducto,
            cant_producto: cantidadProducto,
        precio_producto: precioProducto}, id], (error, results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        })
    }
