import React, { useState, useEffect } from 'react';

import { useNavigate, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import api from '../../../services/api.js';

import Sidebar from '../../Sidebar/sidebar.js';

import { Button, Container, Spinner, Navbar } from 'react-bootstrap';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

import InputMask from 'react-input-mask';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function NovoAdmin() {
  const token = useSelector((state) => state.authReducer.auth.token);
  const autorizacao = useSelector(
    (state) => state.authReducer.auth.autorizacao
  );
  const navigate = useNavigate();
  const [age, setAge] = useState('');

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [username, setUsername] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const [uf, setUf] = useState([]);

  const [ufOpt, setUfOpt] = useState(null);

  const requests = async () => {
    const responseUf = await fetch('http://localhost:8080/goapp/uf/listar');

    const responseDataUf = await responseUf.json();

    setUf(responseDataUf);
  };

  const handleCadastro = async (e) => {
    setLoading(true);
    e.preventDefault();

    let tel =
      telefone.substring(1, 3) +
      telefone.replace(/ *\([^)]*\) */g, '').replace(/-/g, '');

    const data =
      dataNascimento.substring(6) +
      '-' +
      dataNascimento.substring(3, 5) +
      '-' +
      dataNascimento.substring(0, 2);

    const json = JSON.stringify({
      nome: `${nome}`,
      email: `${email}`,
      dataNascimento: `${data}`,
      senha: `${senha}`,
      telefone: `${tel}`,
      userUnico: `${username}`,
      logradouro: `${logradouro}`,
      numero: `${numero}`,
      bairro: `${bairro}`,
      cidade: `${cidade}`,
      ufNome: `${ufOpt}`,
    });

    await api
      .post('/usuario/admin/novo', json, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setLoading(false);
        alert('Novo usuário inserido.');
      })
      .catch((e) => {
        alert('Nome de usuário já existe. Por favor escolha outro.');
      });
  };

  useEffect(() => {
    requests();
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
      </Box>
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ marginTop: -30, marginBottom: 20 }}
            >
              Cadastrar um novo usuário Administrador
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleCadastro}
              sx={{ mt: 3 }}
              style={{ marginLeft: 170 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={5} sm={8}>
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Usuário"
                    name="username"
                    autoComplete="family-name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    name="senha"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputMask
                    mask="(99)99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  >
                    {() => (
                      <TextField
                        required
                        fullWidth
                        id="telefone"
                        label="Telefone"
                        name="username"
                        autoComplete="family-name"
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <InputMask
                    mask="99/99/9999"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  >
                    {() => (
                      <TextField
                        required
                        fullWidth
                        id="username"
                        label="Data de Nascimento"
                        autoComplete="family-name"
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="logradouro"
                    required
                    fullWidth
                    id="logradouro"
                    label="Logradouro"
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    autoComplete="given-name"
                    name="bairro"
                    required
                    fullWidth
                    id="bairro"
                    label="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="number"
                    autoComplete="given-name"
                    name="numero"
                    required
                    fullWidth
                    id="numero"
                    label="Número"
                    value={numero}
                    onChange={(event) =>
                      event.target.value < 0
                        ? setNumero((event.target.value = 0))
                        : setNumero(event.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={8}>
                  <TextField
                    autoComplete="given-name"
                    name="cidade"
                    required
                    fullWidth
                    id="cidade"
                    label="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </Grid>

                <Grid item xs={10} sm={4}>
                  <FormControl sx={{ minWidth: 280 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={ufOpt}
                      label="UF"
                      onChange={(e) => setUfOpt(e.target.value)}
                    >
                      {uf.map((element, index) => (
                        <MenuItem value={element.ufNome}>
                          {element.ufNome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                style={{ marginTop: 30, marginBottom: 150 }}
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
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
