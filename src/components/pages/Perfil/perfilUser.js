import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import api from '../../../services/api.js';

import { Button, Container, Alert, Spinner, Navbar } from 'react-bootstrap';

import Sidebar from '../../Sidebar/sidebar.js';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import InputMask from 'react-input-mask';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function PerfilUser() {
  const dispatch = useDispatch();

  const [age, setAge] = useState('');
  const [id, setId] = useState(null);

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
  const [personal, setPersonal] = useState([]);

  const [ufOpt, setUfOpt] = useState(null);
  const [personalOpt, setPersonalOpt] = useState(null);

  const token = useSelector((state) => state.authReducer.auth.token);

  const autorizacao = useSelector(
    (state) => state.authReducer.auth.autorizacao
  );

  const usuario = useSelector((state) => state.authReducer.auth.username);

  const [error, setError] = useState(false);

  const handleAtualizaDados = async (e) => {
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
      emailPersonal: `${personalOpt}`,
    });

    await api
      .put(`/usuario/atualizar/${id}`, json, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        alert('Dados atualizados.');
      })
      .catch((e) => {
        alert('Erro ao atualizar.');
      });
  };

  const inputDados = async () => {
    try {
      const result = await api.get(`/usuario/${usuario}`, {
        headers: {
          Authorization: `${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const resultData = await result.data;
      console.log(resultData);
      setId(resultData.id);
      setNome(resultData.nome);
      setEmail(resultData.email);
      setDataNascimento(resultData.dataNascimento);
      setTelefone(resultData.telefone);
      setUsername(resultData.userUnico);
      setLogradouro(resultData.endereco.logradouro);
      setBairro(resultData.endereco.bairro);
      setCidade(resultData.endereco.cidade);
      setNumero(resultData.endereco.numero);
      if (autorizacao == 'ROLE_USER') {
        setPersonalOpt(resultData.personalTrainer.emailPersonal);
      }
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    inputDados();
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
              marginTop: 90,
              marginBottom: 10,
              marginLeft: 20,
              fontSize: 20,
            }}
          >
            MEUS DADOS
          </div>

          {error === true ? (
            <Alert variant={'danger'}>Erro na requisição.</Alert>
          ) : (
            <>
              <ThemeProvider theme={theme}>
                <Container component="main">
                  <CssBaseline />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleAtualizaDados}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
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

                        {autorizacao === 'ROLE_ADMIN' ? null : (
                          <Grid item xs={12} sm={5}>
                            <FormControl sx={{ minWidth: 280 }}>
                              <InputLabel id="demo-simple-select-helper-label">
                                Personal Trainer
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={personalOpt}
                                label="Personal Trainer"
                                onChange={(e) => setPersonalOpt(e.target.value)}
                              >
                                <MenuItem value={personalOpt}>
                                  Andrea Rita
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        )}

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
                              <MenuItem value={'SP'}>SP</MenuItem>
                            </Select>
                          </FormControl>
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
                          'ATUALIZAR'
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
