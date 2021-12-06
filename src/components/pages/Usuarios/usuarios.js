import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { Table, Alert } from 'react-bootstrap';

import Sidebar from '../../Sidebar/sidebar.js';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CancelIcon from '@mui/icons-material/Cancel';

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const token = useSelector((state) => state.authReducer.auth.token);
  const autorizacao = useSelector(
    (state) => state.authReducer.auth.autorizacao
  );

  const [error, setError] = useState(false);

  console.log(token);
  const listaUsers = async () => {
    try {
      const result = await fetch('http://localhost:8080/goapp/usuario/listar', {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });
      const resultData = await result.json();

      setUsers(resultData);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (id) => {
    try {
      const result = await fetch(
        `http://localhost:8080/goapp/usuario/excluir/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(result);
      await listaUsers();
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    listaUsers();
  }, []);

  return token === '' || autorizacao === 'ROLE_USER' ? (
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
            USUÁRIOS
          </div>

          {error === true ? (
            <Alert variant={'danger'}>Erro na requisição.</Alert>
          ) : (
            <Table
              responsive
              style={{ marginLeft: 50, width: 900, height: 100 }}
            >
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Usuário</th>
                  <th>Autorização</th>
                  <th>Personal Trainer responsável</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>AINDA NÃO POSSUI NENHUM USUÁRIO.</td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  users.map((element, index) => (
                    <>
                      <tr key={index}>
                        <td>{element.nome}</td>
                        <td>{element.userUnico}</td>
                        <td>{element.autorizacao[0].nomeAut}</td>
                        <td style={{ marginLeft: 10 }}>
                          {element.personalTrainer == null
                            ? 'Não possui'
                            : element.personalTrainer.nomePersonal}
                        </td>
                        <td>
                          <ListItem
                            button
                            onClick={() => {
                              if (window.confirm('Confirma exclusão?')) {
                                deleteUser(element.id);
                              }
                            }}
                          >
                            <ListItemIcon>
                              <CancelIcon />
                            </ListItemIcon>
                          </ListItem>
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
