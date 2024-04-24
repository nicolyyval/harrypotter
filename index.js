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

app.get('/', (req, res) => {
    res.send('A rota está funcionando! ✨🐍');
  });
  
  
  // Iniciar o servidor
  app.listen(PORT, () => {
    console.log(`🐍 Servidor rodando na porta ${PORT} 🐍`);
  });