import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Alert, Button, Spinner } from 'react-bootstrap';

import Sidebar from '../../Sidebar/sidebar.js';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';

import api from '../../../services/api.js';

export default function InserirPersonal() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [formacao, setFormacao] = useState('');

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.authReducer.auth.token);
  const autorizacao = useSelector(
    (state) => state.authReducer.auth.autorizacao
  );
  const [error, setError] = useState(false);

  const addPersonal = async () => {
    const json = JSON.stringify({
      nome: `${nome}`,
      email: `${email}`,
      formacao: `${formacao}`,
    });
    try {
      const result = await api.post('/personal/novo', json, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      alert('Personal inserido!');
      navigate('/personal/listar');
    } catch (e) {
      alert('Email já existente.');
    }

    console.log(result.data);
  };

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
            NOVO PERSONAL
          </div>

          {error === true ? (
            <Alert variant={'danger'}>Erro na requisição.</Alert>
          ) : (
            <>
              <Box
                component="form"
                noValidate
                onSubmit={addPersonal}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={8}>
                    <TextField
                      autoComplete="given-name"
                      name="nome"
                      required
                      fullWidth
                      id="firstName"
                      label="Nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="logradouro"
                      required
                      fullWidth
                      id="formacao"
                      label="Formação"
                      value={formacao}
                      onChange={(e) => setFormacao(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  style={{ marginTop: 30 }}
                >
                  {loading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden"></span>
                    </Spinner>
                  ) : (
                    'CADASTRAR'
                  )}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
