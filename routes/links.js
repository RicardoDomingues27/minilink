const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/',(req,res, next)=>{
    

    mysql.getConnection((error, conn) =>{
        conn.release();
        if(error){return res.status(500).send({error: error})};

        conn.query(
            'SELECT * FROM links;',
            (error, resultado, fields) => {
                if(error ){return res.status(500).send({error: error})}
                if(resultado.length == 0){return res.status(500).send({error: "Lista vazia"})}
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
            "INSERT INTO links (nome,preco) VALUES(?,?)",
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

router.get('/:id_link',(req,res, next)=>{
    const id = req.params.id_produto
    
    mysql.getConnection((error, conn) =>{
        conn.release();
        if(error){return res.status(500).send({error: error})};

        conn.query(
            'SELECT * FROM links WHERE id_link = ?;',
            [id],
            (error, resultado, fields) => {
                if(error){return res.status(500).send({error: error})};
                return res.status(200).send({response: resultado})
            }

        )
    });
});

router.delete('/:id_link',(req,res,next)=> {
    const id = req.params.id_produto

    mysql.getConnection((error, conn) =>{
        conn.release();
        if(error){return res.status(500).send({error: error})};

        conn.query('DELETE FROM links WHERE id_link = ?',
            [id],
            (error, resultado, fields) =>{
                if(error){return res.status(500).send({error: error})};
                return res.status(200).send({response: resultado})
            }
        )

    })

});

router.patch('/',(req,res,next)=> {
    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota de produtos'
    });
});
module.exports = router;