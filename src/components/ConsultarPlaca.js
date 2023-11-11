import React, { useState } from 'react';
import axios from 'axios';
import './ConsultarPlaca.css';

function ConsultarPlaca() {
  const [placa, setPlaca] = useState('');
  const [resultado, setResultado] = useState(null);

  const handlePlacaChange = (event) => {
    setPlaca(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Recupere o token armazenado no cliente (após o usuário fazer login)
    const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no local storage

    try {
      // Adicione o token ao cabeçalho da requisição
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Faça a chamada para a API para consultar a placa
      const response = await axios.get(`/consulta/${placa}`, { headers });

      // Atualize o estado 'resultado' com a resposta da API
      setResultado(response.data);
    } catch (error) {
      console.error('Erro ao consultar placa:', error);
      // Lide com erros aqui, se necessário
    }
  };

  return (
    <div>
      <h2>Consultar Placa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número da Placa:</label>
          <input type="text" value={placa} onChange={handlePlacaChange} />
        </div>
        <div>
          <button type="submit">Consultar Placa</button>
        </div>
      </form>
      {resultado && (
        <div>
          <h3>Resultado:</h3>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
}

export default ConsultarPlaca;
