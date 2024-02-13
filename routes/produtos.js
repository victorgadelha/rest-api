const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query('SELECT * FROM produtos', (error, result, field) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: result.length,
        produtos: result.map((prod) => {
          const { id_produto, nome, preco } = prod;
          return {
            id_produto,
            nome,
            preco,
            request: {
              tipo: 'GET',
              descricao: 'Retorna todos os produtos.',
              url: `http://localhost:3000/produtos/{prod.id_produto}`,
            },
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    const { nome, preco } = req.body;
    conn.query(
      'INSERT INTO produtos (nome, preco) VALUES (?,?)',
      [nome, preco],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: 'Produto inserido com sucesso.',
          produtoCriado: {
            id_produto: result.insertId,
            nome,
            preco,
            request: {
              tipo: 'POST',
              descricao: 'Insere um produto',
              url: `http://localhost:3000/produtos/${result.insertId}`,
            },
          },
        };
        return res.status(201).send(response);
      }
    );
  });
});

// RETORNA OS DADOS DE UM PRODUTO ESPECÍFICO
router.get('/:id_produto', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    const { id_produto } = req.params;
    conn.query(
      'SELECT * FROM produtos WHERE id_produto = ?',
      [id_produto],
      (error, result, field) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res
            .status(404)
            .send({ mensagem: 'Não foi encontrado produto com este ID' });
        }
        const { nome, preco } = result[0];
        const response = {
          produto: {
            id_produto,
            nome,
            preco,
            request: {
              tipo: 'GET',
              descricao: 'Retorna um produto específico',
              url: `http://localhost:3000/produtos`,
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    const { nome, preco, id_produto } = req.body;

    if (!id_produto) {
      return res.status(400).send({ mensagem: 'ID do produto não fornecido.' });
    }

    conn.query(
      'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
      [nome, preco, id_produto],

      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .send({ mensagem: 'Produto não encontrado ou ID inválido.' });
        }
        const response = {
          mensagem: 'Produto editado com sucesso.',
          produto: {
            id_produto,
            nome,
            preco,
          },
          request: {
            tipo: 'PATCH',
            descricao: 'edita um produto',
            url: `http://localhost:3000/produtos/${id_produto}`,
          },
        };
        return res.status(201).send(response);
      }
    );
  });
});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    const { id_produto } = req.body;
    conn.query(
      'DELETE FROM produtos WHERE id_produto = ?',
      [id_produto],
      (error, resultado, field) => {
        if (error) {
          return res.status(500).send({ error: error });
        }

        return res.status(202).send({
          mensagem: 'Produto removido com sucesso',
        });
      }
    );
  });
});

module.exports = router;
