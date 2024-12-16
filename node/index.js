import express from 'express';
import { createConnection } from 'mysql2';

const app = express();

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'Pessoa',
};

const connection = createConnection(config);

connection.query(
  `CREATE TABLE IF NOT EXISTS Pessoa (IdPessoa INT AUTO_INCREMENT PRIMARY KEY, Nome VARCHAR(255) NOT NULL)`,
  (err) => {
    if (err) throw err;
    console.log('Tabela criada ou já existe!');
  }
);

app.get('/', (req, res) => {
  const nome = `Usuário ${Math.floor(Math.random() * 100)}`;
  connection.query(`INSERT INTO Pessoa (Nome) VALUES (?)`, [nome], (err) => {
    if (err) throw err;

    connection.query('SELECT Nome FROM Pessoa', (err, results) => {
      if (err) throw err;

      const listaNomes = results.map((linha) => `<li>${linha.Nome}</li>`).join('');
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>${listaNomes}</ul>
      `);
    });
  });
});

app.listen(3000, () => {
  console.log('Aplicação Node.js em execução na porta 3000!');
});
