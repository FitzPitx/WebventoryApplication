const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 5000);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log('Server is listening on port 5000');
});

