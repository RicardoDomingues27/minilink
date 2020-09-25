const express = require('express');
const router = express.Router();

router.get('/',(req,res, next)=>{
    res.status(200).send({
        mensagem:'Usando o GET dentro da rota de pedidos'
    });
});

router.post('/',(req,res,next)=> {
    res.status(201).send({
        mensagem: 'Usando POST dentro da rota de pedidos'
    });
});

router.get('/:id_pedido',(req,res, next)=>{
    const id = req.params.id_pedido
    
    if(id === 'especial'){
        res.status(200).send({
            mensagem: 'Usando GET Produto ESPECIAL',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: 'Usando GET Pedido ID',
            id: id
        });
    }
});

router.delete('/',(req,res,next)=> {
    res.status(201).send({
        mensagem: 'Usando DELETE dentro da rota de pedidos'
    });
});

router.patch('/',(req,res,next)=> {
    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota de pedidos'
    });
});
module.exports = router;