import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import api from '../../../services/api.js';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TimePicker from '@mui/lab/TimePicker';
import { Button, Container, Spinner, Navbar } from 'react-bootstrap';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';

import Sidebar from '../../Sidebar/sidebar.js';

const drawerWidth = 240;

export default function LimiteUsuarios() {
  const token = useSelector((state) => state.authReducer.auth.token);

  const username = useSelector((state) => state.authReducer.auth.username);

  const limite = useSelector(
    (state) => state.agendamentoReducer.agendamento.limite_users
  );

  const [limiteUsers, setLimiteUsers] = useState(limite);

  const [loading, setLoading] = useState(false);

  const autorizacao = useSelector(
    (state) => state.authReducer.auth.autorizacao
  );

  const navigate = useNavigate();

  const novoLimiteUsers = async (e) => {
    e.preventDefault();

    setLoading(true);

    const json = JSON.stringify({
      id: 1,
      valor: limiteUsers,
    });

    await api
      .put(`admin/atualizar/limite`, json, {
        headers: {
          'Content-Type': 'application/json',
          //Authorization: `${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        alert('Limite atualizado.');
      })
      .catch((e) => {
        alert('Erro ao atualizar.');
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            GO!
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar />
      <Container component="main">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginTop: 90,
              marginRight: 900,
              fontSize: 20,
            }}
          >
            LIMITE DE USUÁRIOS POR HORA
          </div>
          <Box
            component="form"
            noValidate
            onSubmit={novoLimiteUsers}
            sx={{ flexGrow: 1, p: 10, marginLeft: -110 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  autoComplete="given-name"
                  name="nome"
                  required
                  fullWidth
                  id="firstName"
                  label="Limite"
                  value={limiteUsers}
                  onChange={(e) => setLimiteUsers(e.target.value)}
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
                'ATUALIZAR'
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
