const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

// Conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harrypotter',
    password: 'ds564',
    port: 7007,
});
app.use(express.json());

//Rota que obtem todos os bruxos
app.get('/bruxos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM bruxos');
        res.json({
            total: resultado.rowCount,
            bruxos: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter bruxos', error);
        res.status(500).json({ message: 'Erro ao obter os bruxos' });
    }
});


app.get('/bruxos/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const resultado = await pool.query('SELECT * FROM bruxos WHERE nome = $1', [nome]);
        res.json({
            bruxo: resultado.rows[0],
        });
    } catch (error) {
        console.error('Erro ao obter bruxo', error);
        res.status(500).json({ message: 'Erro ao obter bruxo' });
    }
});

//Rota que obtem todas as varinhas
app.get('/varinhas', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM varinhas');
        res.json({
            total: resultado.rowCount,
            varinhas: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter varinhas', error);
        res.status(500).json({ message: 'Erro ao obter as varinhas' });
    }
});


//Rota que insere um bruxo
app.post('/bruxos', async (req, res) => {
    try {
        const { nome, idade, casa_hogwarts, habilidade, status_sangue, patrono } = req.body;
        if (status_sangue !== 'puro' && status_sangue !== 'mestiço' && status_sangue !== 'trouxa') {
            return res.status(400).json({ message: 'Status de sangue inválido' });
        }
        if (casa_hogwarts !== 'Grifinória' && casa_hogwarts !== 'Sonserina' && casa_hogwarts !== 'Corvinal' && casa_hogwarts !== 'Lufa-Lufa') {
            return res.status(400).json({ message: 'Casa de Hogwarts inválida' });
        }
        await pool.query(
            'INSERT INTO bruxos (nome, idade, casa_hogwarts, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)',
            [nome, idade, casa_hogwarts, habilidade, status_sangue, patrono]
        );
        res.json({ message: 'Bruxo inserido com sucesso! 🐍' });
    } catch (error) {
        console.error('Erro ao inserir bruxo', error);
        res.status(500).json({ message: 'Erro ao inserir bruxo' });
    }
});

//Rota que insere uma varinha
app.post('/varinhas', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_criacao } = req.body;
        await pool.query(
            'INSERT INTO varinhas (material, comprimento, nucleo, data_criacao) VALUES ($1, $2, $3, $4)',
            [material, comprimento, nucleo, data_criacao]
        );
        res.json({ message: 'Varinha inserida com sucesso! 🧙🏻‍♂️' });
    } catch (error) {
        console.error('Erro ao inserir varinha', error);
        res.status(500).json({ message: 'Erro ao inserir varinha' });
    }
});

//Rota que deleta um bruxo
app.delete('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
        res.json({ message: 'Bruxo deletado com sucesso! 🐍' });
    } catch (error) {
        console.error('Erro ao deletar bruxo', error);
        res.status(500).json({ message: 'Erro ao deletar bruxo' });
    }
});

//Rota que deleta uma varinha
app.delete('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);
        res.json({ message: 'Varinha deletada com sucesso! 🧙🏻‍♂️' });
    } catch (error) {
        console.error('Erro ao deletar varinha', error);
        res.status(500).json({ message: 'Erro ao deletar varinha' });
    }
});

//Rota que atualiza um bruxo
app.put('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, casa_hogwarts, habilidade, status_sangue, patrono } = req.body;
        await pool.query(
            'UPDATE bruxos SET nome = $1, idade = $2, casa_hogwarts = $3, habilidade = $4, status_sangue = $5, patrono = $6 WHERE id = $7',
            [nome, idade, casa_hogwarts, habilidade, status_sangue, patrono, id]
        );
        res.json({ message: 'Bruxo atualizado com sucesso! 🐍' });
    } catch (error) {
        console.error('Erro ao atualizar bruxo', error);
        res.status(500).json({ message: 'Erro ao atualizar bruxo' });
    }
});

//Rota que atualiza uma varinha
app.put('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, data_criacao } = req.body;
        await pool.query(
            'UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_criacao = $4 WHERE id = $5',
            [material, comprimento, nucleo, data_criacao, id]
        );
        res.json({ message: 'Varinha atualizada com sucesso! 🧙🏻‍♂️' });
    } catch (error) {
        console.error('Erro ao atualizar varinha', error);
        res.status(500).json({ message: 'Erro ao atualizar varinha' });
    }
});

//Get bruxo por id
app.get('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
        res.json({
            bruxo: resultado.rows[0],
        });
    } catch (error) {
        console.error('Erro ao obter bruxo', error);
        res.status(500).json({ message: 'Erro ao obter bruxo' });
    }
});


//Get varinha por id
app.get('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
        res.json({
            varinha: resultado.rows[0],
        });
    } catch (error) {
        console.error('Erro ao obter varinha', error);
        res.status(500).json({ message: 'Erro ao obter varinha' });
    }
});


app.get('/', (req, res) => {
    res.send('A rota está funcionando! ✨🐍');
  });
  
  
  // Iniciar o servidor
  app.listen(PORT, () => {
    console.log(`🐍 Servidor rodando na porta ${PORT} 🐍`);
  });