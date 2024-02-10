const express = require('express');
const router = express.Router();

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Usando o GET dentro da rota de produtos',
  });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Usando o POST dentro da rota de produtos',
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

module.exports = router;
