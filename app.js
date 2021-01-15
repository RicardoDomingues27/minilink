const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('./mysql').pool;

var cors = require('cors')

app.use(cors())

const rotaLinks = require('./routes/links');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); 
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

app.use('/links',rotaLinks);

app.use('/:minilink',( req, res, next) => {
    const minilink = req.params.minilink
    if(minilink !== 'links' && minilink !== 'pedidos'){
        mysql.getConnection((error,conn)=>{
            if(error){return res.status(500).send({error:'Erro ao se conectar com o banco de dados'})}
            conn.query(`SELECT url FROM links WHERE minilink = '${minilink}' LIMIT 1` ,(error, result, fields)=>{
                if(error !== null || result.length === 0){
                    return res.status(500).send({error: 'Minilink não encontrado'})
                }
                return res.redirect(normalizedURL(result.shift().url ));
                
            })
        })
    }
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
});

function normalizedURL(url){
    
    if(url.indexOf('http') <0){
        return 'https://'+url;
    }
    return '';
}

module.exports = app;