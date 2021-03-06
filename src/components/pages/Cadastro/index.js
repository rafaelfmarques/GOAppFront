import React, { useState, useEffect } from 'react';

import './cadastro.css';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import api from '../../../services/api.js';

import { Button, Container, Spinner, Navbar } from 'react-bootstrap';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useNavigate } from 'react-router-dom';

import InputMask from 'react-input-mask';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Cadastro() {
  const [age, setAge] = useState('');

  const navigate = useNavigate();

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

  const requests = async () => {
    const responseUf = await fetch('http://localhost:8080/goapp/uf/listar');

    const responsePersonal = await fetch(
      'http://localhost:8080/goapp/personal/listar'
    );

    const responseDataUf = await responseUf.json();
    const responseDataPersonal = await responsePersonal.json();

    setUf(responseDataUf);
    setPersonal(responseDataPersonal);
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
      emailPersonal: `${personalOpt}`,
    });

    await api
      .post('/usuario/cadastrar', json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        alert('Usu??rio cadastrado.');
        navigate('/login');
      })
      .catch((e) => {
        console.log(e);
        alert('Erro no cadastro do usu??rio.');
      });
  };

  useEffect(() => {
    requests();
  }, []);

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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ marginTop: 0 }}>
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
              style={{ marginTop: -30, marginBottom: 20 }}
            >
              Cadastre-se
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleCadastro}
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
                    label="Usu??rio"
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
                      {personal.map((element, index) => (
                        <MenuItem value={element.emailPersonal}>
                          {element.nomePersonal}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    label="N??mero"
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
              <Grid container justifyContent="flex-end">
                <Grid
                  item
                  style={{ fontSize: 18, marginTop: -30, marginBottom: 90 }}
                >
                  J?? tem uma conta? Fa??a {'  '}
                  <Link href="/login" variant="body2" style={{ fontSize: 18 }}>
                    {'Login'}
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
//                 <Form.Control
//                   type="text"
//                   placeholder="Digite seu nome."
//                   value={nome}
//                   onChange={(e) => setNome(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group as={Col} controlId="formGridPassword">
//                 <Form.Label>Senha</Form.Label>

//                 <Form.Control
//                   type="password"
//                   placeholder="Digite a senha."
//                   value={senha}
//                   onChange={(e) => setSenha(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group as={Col} controlId="formGridUser">
//                 <Form.Label>Nome de usu??rio</Form.Label>

//                 <Form.Control
//                   type="text"
//                   placeholder="Digite o nome de usu??rio."
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group as={Col} controlId="formGridDataNasc">
//                 <Form.Label>Data de Nascimento</Form.Label>
//                 <MaskedFormControl
//                   className="w-50"
//                   type="text"
//                   mask="11/11/1111"
//                   value={dataNascimento}
//                   onChange={(e) => setDataNascimento(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="formGridEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Digite seu email."
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group as={Col} controlId="password">
//                 <Form.Label>Telefone</Form.Label>
//                 <MaskedFormControl
//                   type="text"
//                   mask="(11)11111-1111"
//                   value={telefone}
//                   onChange={(e) => setTelefone(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group as={Col} controlId="formGridState">
//                 <Form.Label>Personal Trainer</Form.Label>
//                 <Form.Select onChange={(e) => setPersonalOpt(e.target.value)}>
//                   <option>Selecione o Personal Trainer.</option>
//                   {personal.map((element, index) => (
//                     <option value={element.emailPersonal}>
//                       {element.nomePersonal}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Row>

//             <Form.Group className="mb-3" controlId="formGridAddress1">
//               <Form.Label>Logradouro</Form.Label>
//               <Form.Control
//                 placeholder="Rua, Avenida."
//                 type="text"
//                 value={logradouro}
//                 onChange={(e) => setLogradouro(e.target.value)}
//               />
//             </Form.Group>

//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="formGridAddress2">
//                 <Form.Label>Bairro</Form.Label>
//                 <Form.Control
//                   placeholder="Digite o bairro"
//                   type="text"
//                   value={bairro}
//                   onChange={(e) => setBairro(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group as={Col} controlId="formGridAddress2">
//                 <Form.Label>N??mero</Form.Label>
//                 <Form.Control
//                   min={0}
//                   placeholder="Digite o n??mero"
//                   type="number"
//                   required
//                   onChange={(e) => setNumero(e.target.value)}
//                 />
//               </Form.Group>
//             </Row>

//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="formGridCity">
//                 <Form.Label>Cidade</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={cidade}
//                   onChange={(e) => setCidade(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group as={Col} controlId="formGridState">
//                 <Form.Label>Estado</Form.Label>
//                 <Form.Select onChange={(e) => setUfOpt(e.target.value)}>
//                   <option>Selecione o estado.</option>
//                   {uf.map((element, index) => (
//                     <option value={element.ufNome}>{element.ufNome}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Row>

//             <Button variant="primary" type="submit">
//               {loading ? (
//                 <Spinner animation="border" role="status">
//                   <span className="visually-hidden"></span>
//                 </Spinner>
//               ) : (
//                 'CADASTRAR'
//               )}
//             </Button>
//           </Form>
//         </div>
//       </Container>
//     </>
//   );
// }

// /**
//  *
//     <div>

//     </div>
// */
