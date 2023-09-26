const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static('/public'));
app.use('/resources', express.static(__dirname + '/public'));

//Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json


//Invocamos a bcrypt
app.set('view engine', 'ejs'); 
const bcrypt = require('bcryptjs');

//variables de session
const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set('port', process.env.PORT || 5000);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', require('./router'));

app.listen(8080, ()=>{
    console.log('Server is listening on port 5000');
});

