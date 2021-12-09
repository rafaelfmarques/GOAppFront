import React, { useEffect, useState } from 'react';

import { Table, Alert, Button } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate, Redirect, Navigate } from 'react-router-dom';

import api from '../../../services/api.js';

import Sidebar from '../../Sidebar/sidebar.js';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CancelIcon from '@mui/icons-material/Cancel';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function Home() {
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const token = useSelector((state) => state.authReducer.auth.token);

  const autorizacao = useSelector(
    (state) => state.authReducer.auth.autorizacao
  );

  const username = useSelector((state) => state.authReducer.auth.username);

  const [agendamentos, setAgendamentos] = useState([]);
  const [meusAgendamentos, setMeusAgendamentos] = useState([]);

  const navigate = useNavigate();

  const date = new Date();

  const deleteAgendamento = async (id) => {
    try {
      const result = await fetch(
        `http://localhost:8080/goapp/agendamento/excluir/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (autorizacao == 'ROLE_ADMIN') {
        await todosAgendamentos();
      } else if (autorizacao == 'ROLE_USER') {
        await myAgendamentos();
      }
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  const todosAgendamentos = async () => {
    try {
      const result = await fetch(
        `http://localhost:8080/goapp/agendamento/listar`,
        {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const resultData = await result.json();
      console.log(resultData);

      dispatch({
        type: 'LIMITE_USERS',
        payload: {
          limite: resultData[0].configuracao.valor,
        },
      });
      setAgendamentos(resultData);
    } catch (e) {
      setError(true);
    }
  };

  const myAgendamentos = async () => {
    try {
      const result = await fetch(
        `http://localhost:8080/goapp/agendamento/usuario/listar/${username}`,
        {
          method: 'GET',
          headers: {
            //Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const resultData = await result.json();
      setMeusAgendamentos(resultData);
    } catch (e) {}
  };

  useEffect(() => {
    if (autorizacao === 'ROLE_ADMIN') {
      todosAgendamentos();
    } else {
      myAgendamentos();
    }
  }, []);

  return token === '' ? (
    <Navigate to="/login" />
  ) : (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - 240px)`,
            ml: `240px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              GO!
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <div
            style={{
              marginTop: 90,
              marginBottom: 50,
              marginLeft: 20,
              fontSize: 20,
            }}
          >
            {autorizacao === 'ROLE_ADMIN'
              ? 'AGENDAMENTOS DO MÊS'
              : 'MEUS AGENDAMENTOS'}
          </div>

          {autorizacao === 'ROLE_ADMIN' ? (
            <div style={{ marginLeft: 900, marginBottom: 50, marginTop: -70 }}>
              <Button
                variant="primary"
                size="sm"
                style={{ alignSelf: 'flex-end' }}
                onClick={() => navigate('/usuario/limiteUsuarios')}
              >
                ALTERAR LIMITE DE USUÁRIOS
              </Button>
            </div>
          ) : null}

          {error === true ? (
            <Alert variant={'danger'}>Erro na requisição.</Alert>
          ) : autorizacao === 'ROLE_ADMIN' ? (
            <Table responsive style={{ marginLeft: 20 }}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Dia</th>
                  <th>Data</th>
                  <th>Horário de início</th>
                  <th>Horário fim</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {agendamentos.length === 0 ? (
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>AINDA NÃO POSSUI NENHUM AGENDAMENTO.</td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  agendamentos.map((element, index) => (
                    <>
                      {element.data.substring(3, 5) < date.getMonth() + 1 &&
                      element.data.substring(6, 10) <=
                        date.getFullYear() ? null : (
                        <tr key={index}>
                          <td>{element.usuario[0].nome}</td>
                          <td>{element.diasSemana.diasSemana}</td>
                          <td>{element.data}</td>
                          <td>{element.horarioInicio}</td>
                          <td>{element.horarioFim}</td>
                          <td>{element.agendamentoStatus.agendamentoStatus}</td>
                          <td>
                            <ListItem
                              button
                              onClick={() => {
                                if (window.confirm('Confirma exclusão?')) {
                                  deleteAgendamento(element.id);
                                }
                              }}
                            >
                              <ListItemIcon>
                                <CancelIcon />
                              </ListItemIcon>
                            </ListItem>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </Table>
          ) : (
            <Table responsive style={{ marginLeft: 20 }}>
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Data</th>
                  <th>Horário de início</th>
                  <th>Horário fim</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {meusAgendamentos.length === 0 ? (
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>AINDA NÃO POSSUI NENHUM AGENDAMENTO.</td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  meusAgendamentos.map((element, index) => (
                    <>
                      <tr key={index}>
                        <td>{element.diasSemana.diasSemana}</td>

                        <td>{element.data}</td>
                        <td>{element.horarioInicio}</td>
                        <td>{element.horarioFim}</td>
                        <td>{element.agendamentoStatus.agendamentoStatus}</td>
                        <td>
                          <ListItem
                            button
                            onClick={() => {
                              if (window.confirm('Confirma exclusão?')) {
                                deleteAgendamento(element.id);
                              }
                            }}
                          >
                            <ListItemIcon>
                              <CancelIcon />
                            </ListItemIcon>
                          </ListItem>{' '}
                        </td>
                      </tr>
                    </>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Box>
      </Box>
    </>
  );
}
