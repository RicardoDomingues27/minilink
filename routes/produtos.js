const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/',(req,res, next)=>{
    /*res.status(200).send({
        mensagem:'Usando o GET dentro da rota de produtos'
    });
*/

    mysql.getConnection((error, conn) =>{
        conn.release();
        if(error){return res.status(500).send({error: error})};

        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, fields) => {
                if(error){return res.status(500).send({error: error})};
                return res.status(200).send({response: resultado})
            }

        )
    });

});
//INSERE PRODUTO
router.post('/',(req,res,next)=> {

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    mysql.getConnection((error,conn) => {
        if(error){return res.status(500).send({error: error})};
        conn.query(
            "INSERT INTO produtos (nome,preco) VALUES(?,?)",
            [req.body.nome ,  req.body.preco],
            (error, resultado, field)=>{
                conn.release();
                if(error){return res.status(500).send({error: error})};
                res.status(201).send({
                    mensagem: 'Produto Inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });


});

router.get('/:id_produto',(req,res, next)=>{
    const id = req.params.id_produto
    
    mysql.getConnection((error, conn) =>{
        conn.release();
        if(error){return res.status(500).send({error: error})};

        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [id],
            (error, resultado, fields) => {
                if(error){return res.status(500).send({error: error})};
                return res.status(200).send({response: resultado})
            }

        )
    });
});

router.delete('/',(req,res,next)=> {
    res.status(201).send({
        mensagem: 'Usando DELETE dentro da rota de produtos'
    });
});

router.patch('/',(req,res,next)=> {
    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota de produtos'
    });
});
module.exports = router;