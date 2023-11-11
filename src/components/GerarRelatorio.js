import React, { useState } from 'react';
import axios from 'axios'; 
import './GerarRelatorio.css';

function GerarRelatorio() {
  const [cidade, setCidade] = useState('');

  const handleCidadeChange = (event) => {
    setCidade(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Faça uma chamada para a API para gerar o relatório com base na cidade
      const response = await axios.get(`/relatorio/cidade/${cidade}`, {
        responseType: 'blob', // Para receber dados binários (PDF)
      });

      // Crie um URL temporário para abrir o PDF em uma nova janela/tab
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url); // Abre o PDF em uma nova janela/tab

      console.log('Relatório gerado com sucesso');
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      // Lide com erros aqui, se necessário
    }
  };

  return (
    <div>
      <h2>Gerar Relatório</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cidade:</label>
          <input type="text" value={cidade} onChange={handleCidadeChange} />
        </div>
        <div>
          <button type="submit">Gerar Relatório</button>
        </div>
      </form>
    </div>
  );
}

export default GerarRelatorio;
