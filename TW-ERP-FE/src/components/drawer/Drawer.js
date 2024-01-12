import React, { useState } from 'react';
import {
  Drawer as Draw,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { drawerRoutes } from '../../utils';
import { MenuIconContainer, NavLinkContainer } from './Drawer.Styles';

export const Drawer = () => {
  const [state, setState] = useState({ left: false });

  const role = useSelector((state) => state?.auth?.userDetails?.role);

  const routes = drawerRoutes.filter((obj) => obj.canAccess.includes(role));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {routes?.map((items, index) => (
          <ListItem key={new Date().getTime()} disablePadding>
            <NavLinkContainer to={items?.path}>
              <ListItemButton>
                <ListItemIcon>{items?.icon}</ListItemIcon>
                <ListItemText primary={items?.name} />
              </ListItemButton>
            </NavLinkContainer>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <MenuIconContainer onClick={toggleDrawer('left', true)} />
      <Draw
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Draw>
    </>
  );
};
