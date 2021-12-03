import React from 'react';
import './style.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Login from './components/pages/Login';
import Cadastro from './components/pages/Cadastro';
import Agendamento from './components/pages/Agendamento';
import Home from './components/pages/Home';

import LimiteUsuarios from './components/pages/Home/limiteUsuarios.js';

import PerfilUser from './components/pages/Perfil/perfilUser.js';

import InserirPersonal from './components/pages/PersonalTrainers/inserir.js';

import ListarPersonal from './components/pages/PersonalTrainers/listar.js';

import NovoAdmin from './components/pages/Usuarios/novoAdmin.js';

import Usuarios from './components/pages/Usuarios/usuarios.js';

import NovoAgendamento from './components/pages/Agendamento/Novo/novo.js';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="cadastro" element={<Cadastro />} />

        <Route path="agendamento" element={<NovoAgendamento />} />

        <Route path="personal">
          <Route path="inserir" element={<InserirPersonal />} />
          <Route path="listar" element={<ListarPersonal />} />
        </Route>

        <Route path="usuario">
          <Route path="dados" element={<PerfilUser />} />
          <Route path="listar" element={<Usuarios />} />
          <Route path="novoAdmin" element={<NovoAdmin />} />
          <Route path="limiteUsuarios" element={<LimiteUsuarios/>} />
        </Route>

        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}
