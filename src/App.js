
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroPlaca from './components/CadastroPlaca';
import GerarRelatorio from './components/GerarRelatorio';
import ConsultarPlaca from './components/ConsultarPlaca.js';


function App() {
 return (
    <Router>
      <Routes>
        <Route path="/CadastroPlaca" element={<CadastroPlaca />} />
        <Route path="/GerarRelatorio" element={<GerarRelatorio />} />
        <Route path="/ConsultarPlaca" element={<ConsultarPlaca />} />
      </Routes>
    </Router>
 );
}

export default App;