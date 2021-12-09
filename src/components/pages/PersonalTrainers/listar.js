import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Table, Alert, Button, Spinner } from 'react-bootstrap';

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

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import InputMask from 'react-input-mask';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate, Navigate } from 'react-router-dom';

import api from '../../../services/api.js';

const theme = createTheme();

export default function ListarPersonal() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [personalTrainers, setPersonalTrainers] = useState([]);

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.authReducer.auth.token);
  const autorizacao = useSelector(
    (state) => state.authReducer.auth.autorizacao
  );
  const [error, setError] = useState(false);

  const deletePersonal = async (id) => {
    try {
      const result = await api.delete(`/personal/excluir/${id}`, {
        headers: {
          Authorization: `${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      await listaPersonal();
      alert('Personal excluído com sucesso.');
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  const listaPersonal = async () => {
    try {
      const result = await api.get('/personal/listar', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      setPersonalTrainers(result.data);
    } catch (e) {
      setErro(true);
    }
  };

  useEffect(() => {
    listaPersonal();
  }, []);

  return token === '' ? (
    <Navigate to="/login" />
  ) : autorizacao === 'ROLE_USER' ? (
    <Navigate to="/home" />
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
              marginTop: 100,
              marginLeft: 20,
              fontSize: 20,
            }}
          >
            Personal Trainers
          </div>

          <div style={{ marginLeft: 900, marginBottom: 50, marginTop: -20 }}>
            <Button
              variant="primary"
              size="sm"
              style={{ alignSelf: 'flex-end' }}
              onClick={() => navigate('/personal/inserir')}
            >
              ADICIONAR NOVO PERSONAL
            </Button>
          </div>

          {error === true ? (
            <Alert variant={'danger'}>Erro ao excluir</Alert>
          ) : (
            <Table responsive style={{ marginLeft: 20 }}>
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>EMAIL</th>
                  <th>FORMAÇÃO</th>
                  <th>AÇÃO</th>
                </tr>
              </thead>

              <tbody>
                {personalTrainers.length === 0 ? (
                  <>
                    <tr>
                      <td></td>
                      <td>
                        AINDA NÃO POSSUI NENHUM PERSONAL TRAINER CADASTRADO
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  personalTrainers.map((element, index) => (
                    <>
                      <tr key={index}>
                        <td>{element.nomePersonal}</td>
                        <td>{element.emailPersonal}</td>
                        <td>{element.formacao}</td>

                        <td>
                          <ListItem
                            button
                            onClick={() => {
                              if (window.confirm('Confirma exclusão?')) {
                                deletePersonal(element.id);
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
