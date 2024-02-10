const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Usando o GET dentro da rota de produtos',
  });
});

router.post('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Usando o POST dentro da rota de produtos',
  });
});

router.get('/:id_produto', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Usando o GET de um produto exclusivo',
  });
});

module.exports = router;
