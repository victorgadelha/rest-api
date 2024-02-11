const express = require('express');
const router = express.Router();

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Retorna todos os produtos',
  });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
  const { id_produto, quantidade } = req.body;
  const produto = {
    id_produto,
    quantidade,
  };

  res.status(201).send({
    mensagem: 'Produto criado com sucesso!',
    produtoCriado: produto,
  });
});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
  const id = req.params.id_produto;

  if (id === 'especial') {
    res.status(200).send({
      mensagem: 'Você passou um ID',
      id: id,
    });
  } else {
    res.status(200).send({
      mensagem: 'Você passou um ID',
    });
  }
});

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Produto alterado',
  });
});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Produto excluído',
  });
});

module.exports = router;
