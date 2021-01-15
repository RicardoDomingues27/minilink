const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/',(req,res,next)=> {

    const link = {
        nome: req.body.nome,
        url: req.body.url,
        minilink: req.body.minilink,
        status: 1
    };

    mysql.getConnection((error,conn) => {
        if(error){return res.status(500).send({error: error})}

        conn.query(
            "INSERT INTO links (nome,url,minilink,status) VALUES(?,?,?,?)",
            [link.nome, link.url, link.minilink, link.status],
            (error, resultado, field)=>{
                conn.release();
                if(error){return res.status(500).send({error: error})};
                res.status(201).send({
                    mensagem: 'Link inserido com sucesso',
                    id_link: resultado.insertId
                });
            }
        )
    });
});

router.get('/',(req,res, next)=>{
    const id = req.body.id_link;
    const nome = req.body.nome;
    mysql.getConnection((error, conn) =>{
        conn.release();
        if(error){return res.status(500).send({error: error})};
        sql = 'SELECT * FROM links;';
      
        if(id !== undefined){ 
            sql = `SELECT * FROM links WHERE id_link = ${id}`;           
        }
        if(nome !== undefined){
            sql = `SELECT * FROM links WHERE nome LIKE '%${nome}%'`;   
        }    
        conn.query(
            sql,
            (error, resultado, fields) => {
                if(error){return res.status(500).send({error: error})};
                if(resultado.length == 0){return res.status(404).send({error: "O item não foi encontrado."})}
                return res.status(200).send({response: resultado})
            }
        )   
    });
});

router.delete('/',(req,res,next)=> {
    const id = req.body.id_link

    mysql.getConnection((error, conn) =>{
        conn.release();
        if(error){return res.status(500).send({error: error})}

        conn.query('DELETE FROM links WHERE id_link = ?',
            [id],
            (error, resultado, fields) =>{
                if(error){return res.status(500).send({error: error})}
                return res.status(200).send({response: {
                    "mensagem" : "Link apagado com sucesso.",
                    "linhas_afetadas" : resultado.affectedRows
                }})
            }
        )
    })
});

router.patch('/',(req,res,next)=> {
    const id  =  req.body.id_link;
    const campo = req.body.campo;
    const valor = req.body.valor;

    mysql.getConnection((error,conn)=>{
        conn.release();
        if(error){return res.status(500).send({error: error})}
        var sql = `UPDATE links SET ${campo} = '${valor}' WHERE id_link = ${id} `;

        conn.query(sql,           
            (error, resultado, fields) =>{
                if(error){return res.status(500).send({error: error.sqlMessage})}
                return res.status(200).send({response:{
                    mensagem : "Update realizado com sucesso",
                    id_link : id,
                    campo : campo,
                    valor : valor
                }})
            }
        )
    });
});
module.exports = router;