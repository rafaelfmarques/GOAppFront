import React, { useState } from 'react';

import { Container, Navbar, Spinner, Button } from 'react-bootstrap';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import api from '../../../services/api.js';

import Popup from 'reactjs-popup';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [valorTentativas, setValorTentativas] = useState(null);

  const navigate = useNavigate();

  const tentativas = async () => {
    try {
      const result = await fetch(
        `http://localhost:8080/goapp/login/tentativas/${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const resultData = await result.json();

      return resultData;
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const tentativa = await tentativas();
    setValorTentativas(tentativa);
    try {
      const result = await api.post('/login', {
        username: `${username}`,
        password: `${senha}`,
      });

      const resultData = result.data;
      if(tentativa === 3){
        setShow(true)
        setLoading(false)
      }else
        if (resultData.token != null) {
        dispatch({
          type: 'AUTH',
          payload: {
            token: resultData.token,
            autorizacao: resultData.autorizacao,
            username: username,
          },
        });
        navigate('/home');
      } else {
        setShow(true);
        setLoading(false);
      }
    } catch (error) {
      setShow(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">GO!</Navbar.Brand>
        </Container>
      </Navbar>
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ marginTop: -30 }}>
              <img
                src="https://i.ibb.co/B63DVfr/GO-1.png"
                alt="GO"
                border="0"
                height={200}
                width={200}
              />
            </div>
            <Typography
              component="h1"
              variant="h5"
              style={{ fontSize: 20, fontWeight: 'bold', marginTop: -20 }}
            >
              Bem-vindo
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Nome de usuário"
                name="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  type="submit"
                  size="lg"
                  style={{ marginTop: 5 }}
                >
                  {loading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden"></span>
                    </Spinner>
                  ) : (
                    'ENTRAR'
                  )}
                </Button>
              </div>

              {show == true ? (
                valorTentativas < 3 ?
                <Alert severity="error" style={{ marginTop: 30 }}>
                  <AlertTitle>Erro</AlertTitle>
                  
                  Usuário ou senha incorreto.
                  <strong>Você possui {3 - valorTentativas} tentativas!</strong>
                </Alert>

                :
                <Alert severity="error" style={{ marginTop: 30 }}>
                  <AlertTitle>Erro</AlertTitle>
                  
                  Usuário ou senha incorreto.
                  <strong>Você excedeu o limite (3) de tentativas!</strong>
                </Alert>

              ) : null}

              <Grid container>
                <Grid item style={{ marginLeft: 300, marginTop: 30 }}>
                  Ainda não possui uma conta?{' '}
                  <Link
                    href="/cadastro"
                    variant="body2"
                    style={{ fontSize: 18 }}
                  >
                    {'Cadastre-se!'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
