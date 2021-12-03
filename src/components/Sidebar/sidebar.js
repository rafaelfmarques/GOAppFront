import React from 'react';

import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useSelector, useDispatch } from 'react-redux';

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.authReducer.auth.token);

  const autorizacao = useSelector(
    (state) => state.authReducer.auth.autorizacao
  );

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/login');
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <img
            src="https://i.ibb.co/B63DVfr/GO-1.png"
            alt="GO"
            border="0"
            height={220}
            width={220}
          />
        </Toolbar>

        <List style={{ marginTop: -30 }}>
          {autorizacao === 'ROLE_USER' ? (
            <>
              <ListItem button onClick={() => navigate('/home')}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
              <ListItem button onClick={() => navigate('/usuario/dados')}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={'Meus dados'} />
              </ListItem>

              <ListItem button onClick={() => navigate('/agendamento')}>
                <ListItemIcon>
                  <ControlPointIcon />
                </ListItemIcon>
                <ListItemText primary={'Novo agendamento'} />
              </ListItem>
            </>
          ) : null}
        </List>
        {autorizacao === 'ROLE_ADMIN' ? (
          <>
            <div
              style={{
                fontSize: 15,
                textAlign: 'center',
                marginRight: 20,
                marginTop: 20,
                marginBottom: 10,
                fontWeight: 'bold',
              }}
            >
              ADMIN
            </div>
            <Divider />
            <ListItem button onClick={() => navigate('/home')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <List>
              <ListItem button onClick={() => navigate('/usuario/dados')}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={'Meus dados'} />
              </ListItem>

              <ListItem button onClick={() => navigate('/usuario/listar')}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={'Usuários'} />
              </ListItem>

              <ListItem button onClick={() => navigate('/personal/listar')}>
                <ListItemIcon>
                  <FitnessCenterIcon />
                </ListItemIcon>
                <ListItemText primary={'Personal Trainers'} />
              </ListItem>

              <ListItem button onClick={() => navigate('/usuario/novoAdmin')}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary={'Novo Admin'} />
              </ListItem>
            </List>
          </>
        ) : null}
        <Divider />
        <ListItem button onClick={() => logout()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={'Sair'} />
        </ListItem>
      </Drawer>
    </>
  );
}
