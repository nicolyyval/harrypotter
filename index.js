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
    const { nome, idade, casa_hogwarts, habilidade, status_sangue, patrono } = req.body;
    try {
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
    const { material, comprimento, nucleo, data_criacao } = req.body;
    try {
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


app.get('/', (req, res) => {
    res.send('A rota está funcionando! ✨🐍');
  });
  
  
  // Iniciar o servidor
  app.listen(PORT, () => {
    console.log(`🐍 Servidor rodando na porta ${PORT} 🐍`);
  });