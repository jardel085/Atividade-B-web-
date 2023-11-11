const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Chave secreta para assinar o token (deve ser mantida em segredo)
const secretKey = 'suaChaveSecreta';

// Dados fictícios de usuário para validação
const usuario = {
  email: 'usuario@example.com',
  senha: 'senha123'
};

// Rota POST '/login'
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o email e a senha correspondem aos dados fictícios do usuário
  if (email === usuario.email && senha === usuario.senha) {
    // Gera um token de autenticação
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' }); // Token válido por 1 hora

    res.json({ token });
  } else {
    res.status(401).json({ mensagem: 'Dados incorretos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
