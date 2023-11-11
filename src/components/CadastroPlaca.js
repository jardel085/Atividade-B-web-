import React, { useState } from 'react';
import axios from 'axios';
import './CadastroPlaca.css';

function CadastroPlaca() {

  const [cidade, setCidade] = useState('');
  const [imagem, setImagem] = useState(null);
  const [placaReconhecida] = useState('');

  const handleCidadeChange = (event) => {
    setCidade(event.target.value);
  };

  const handleImagemChange = (event) => {
    setImagem(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crie um objeto FormData para enviar a imagem e o nome da cidade
    const formData = new FormData();
    formData.append('cidade', cidade);
    formData.append('foto', imagem);

    try {
      // Envia a imagem para a API de OCR (substitua 'URL_DA_API_DE_OCR' pela URL real)
      const ocrResponse = await axios.post('https://console.cloud.google.com/apis/api/vision.googleapis.com/metrics?project=magnetic-tenure-404423', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Extrai a placa reconhecida da resposta da API de OCR
      const numeroDaPlaca = ocrResponse.data.numeroDaPlaca;

      // Inclui o número da placa reconhecida no objeto formData
      formData.append('numeroDaPlaca', numeroDaPlaca);

      // envia os dados (incluindo a placa reconhecida) para o servidor do MongoDB
      const mongodbResponse = await axios.post('/cadastroPlaca', formData);

      console.log('Cadastro de placa bem-sucedido:', mongodbResponse.data);
      // pode lidar com a resposta do servidor MongoDB aqui, se necessário
    } catch (error) {
      console.error('Erro ao cadastrar placa:', error);
      // Lide com erros aqui, se necessário
    }
  };

  return (
    <div>
      <h2>Cadastro de Placa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cidade:</label>
          <input type="text" value={cidade} onChange={handleCidadeChange} />
        </div>
        <div>
          <label>Imagem da Placa (PNG):</label>
          <input type="file" accept="image/png" onChange={handleImagemChange} />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      {placaReconhecida && (
        <div>
          <p>Placa Reconhecida: {placaReconhecida}</p>
        </div>
      )}
    </div>
  );
}

export default CadastroPlaca;
