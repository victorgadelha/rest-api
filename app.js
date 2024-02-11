const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// Quando não encontrar a rota
app.use((req, res, next) => {
  const error = new Error('Não encontrado.');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      messagem: error.message,
    },
  });
});

app.use('/teste', (req, res, next) => {
  res.status(200).send({
    mensagem: 'OK, deu certo!',
  });
});

module.exports = app;
