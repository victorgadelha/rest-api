const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Usando o GET dentro da rota de produtos',
  });
});
