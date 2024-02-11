const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

app.use((req, res, next) => {
  const erro = new Error('Não encontrado.');
});

app.use('/teste', (req, res, next) => {
  res.status(200).send({
    mensagem: 'OK, deu certo!',
  });
});

module.exports = app;
