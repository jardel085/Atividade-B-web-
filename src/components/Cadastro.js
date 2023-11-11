const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

// Configurar middleware
app.use(express.json());

// Configurar conexão com o banco de dados
mongoose.connect('mongodb://localhost/login_database', {
 useNewUrlParser: true,
 useUnifiedTopology: true
});

// Criar uma rota POST '/cadastro'
app.post('/cadastro', async (req, res) => {
 const { email, senha } = req.body;

 // Verificar se o email já existe
 const userExists = await User.findOne({ email });

 if (userExists) {
    return res.status(400).json({ error: 'Usuário já existe' });
 }

 // Criptografar a senha
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(senha, salt);

 // Criar um novo usuário com a senha criptografada
 const user = new User({ email, senha: hashedPassword });

 try {
    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso' });
 } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
 }
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));