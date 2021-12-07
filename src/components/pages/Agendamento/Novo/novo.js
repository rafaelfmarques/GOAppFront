import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import api from '../../../../services/api.js';

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

import Sidebar from '../../../Sidebar/sidebar.js';

const drawerWidth = 240;

export default function NovoAgendamento() {
  const token = useSelector((state) => state.authReducer.auth.token);

  const username = useSelector((state) => state.authReducer.auth.username);

  const [loading, setLoading] = useState(false);

  const autorizacao = useSelector(
    (state) => state.authReducer.auth.autorizacao
  );
  const [time, setTime] = useState(new Date());

  const navigate = useNavigate();

  const [data, setData] = useState(new Date());
  const [validaData, setValidaData] = useState(new Date());

  const novoAgendamento = async (e) => {
    setLoading(true);
    e.preventDefault();

    let dat = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
    let mes =
      data.getMonth() + 1 < 10
        ? `0${data.getMonth() + 1}`
        : data.getMonth() + 1;
    let ano = data.getFullYear();

    let horas = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    let minutos =
      time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    let segundos =
      time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();

    let hours = `${horas}:${minutos}:${segundos}`;

    let date = `${ano}-${mes}-${dat}`;
    let dia =
      data.getDay() === 0
        ? 'Domingo'
        : data.getDay() === 1
        ? 'Segunda-Feira'
        : data.getDay() === 2
        ? 'Terça-Feira'
        : data.getDay() === 3
        ? 'Quarta-Feira'
        : data.getDay() === 4
        ? 'Quinta-Feira'
        : data.getDay() === 5
        ? 'Sexta-Feira'
        : data.getDay() === 6
        ? 'Sábado'
        : null;

    const json = JSON.stringify({
      data: `${date}`,
      horarioInicio: `${hours}`,
      diasSemana: `${dia}`,
      userUnico: `${username}`,
    });

    try {
      const result = await api.post(`/agendamento/novo`, json, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      setLoading(false);
      alert(
        `Agendamento criado em: ${dia}, ${dat}/${mes}/${data.getFullYear()}`
      );
    } catch (e) {
      alert(
        'Horário cheio ou já existe um agendamento marcado, verifique e tente novamente.'
      );
      setLoading(false);
    }
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
      <Box
        component="form"
        noValidate
        onSubmit={novoAgendamento}
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
          NOVO AGENDAMENTO
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2} style={{ marginLeft: 30 }}>
            <Stack spacing={5}>
              <Grid item xs={8} sm={10}>
                <DesktopDatePicker
                  shouldDisableDate={(date) =>
                    date.getDate() < validaData.getDate()
                  }
                  label="Data"
                  inputFormat="dd/MM/yyyy"
                  value={data}
                  onChange={(value) => setData(value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>

              <Grid item xs={8} sm={10}>
                <TimePicker
                  label="Hora"
                  minTime={new Date(0, 0, 0, 7)}
                  maxTime={new Date(0, 0, 0, 21, 0)}
                  value={time}
                  shouldDisableTime={(timeValue, clockType) => {
                    return clockType === 'minutes' && timeValue != 0;
                  }}
                  onChange={(value) => setTime(value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Stack>
          </Grid>
          <Button
            variant="primary"
            type="submit"
            size="lg"
            style={{ marginTop: 30, marginLeft: 30 }}
          >
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            ) : (
              'INSERIR'
            )}
          </Button>
        </LocalizationProvider>
      </Box>
    </Box>
  );
}
