const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use((req, res, next) => {
  res.header('Acces-Control-Allow-Origin', '*');
  res.header(
    'Acces-Control-Allow-Header',
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }
  next();
});

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// Quando não encontrar a rota
app.use((req, res, next) => {
  const error = new Error('Não encontrado.');
  error.status = 404;
  next(error);
});

app.use('/teste', (req, res, next) => {
  res.status(200).send({
    mensagem: 'OK, deu certo!',
  });
});

module.exports = app;
