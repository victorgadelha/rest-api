const express = require('express');
const router = express.Router();

// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'retorna os pedidos',
  });
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'O pedido foi criado',
  });
});

// RETORNA OS DADOS DE UM pedido
router.get('/:id_produto', (req, res, next) => {
  const id = req.params.id_produto;
  res.status(200).send({
    mensagem: 'Detalhes do pedido',
  });
});

// EXCLUI UM PEDIDO
router.delete('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Pedido excluído',
  });
});

module.exports = router;
