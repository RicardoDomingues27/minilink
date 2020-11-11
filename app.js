const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors())

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); //apenas dados simples
app.use(bodyParser.json());

app.use((req,res,next)=>{
    req.header('Access-Control-Allow-Origin', '*');
    req.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requirested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        req.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return req.status(200).send({});
    }
    next();
})

app.use('/produtos',rotaProdutos);
app.use('/pedidos',rotaPedidos);

// Tratamento de erro
app.use(( req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404 ;
    next(erro);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
});

module.exports = app;