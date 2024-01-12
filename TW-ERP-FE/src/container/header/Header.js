import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Drawer } from '../../components';
import { Images } from '../../assets';
import { ImageContainer, Avtar, NavLinkContainer } from './Header.styles';
import { BoxContainer } from './Header.styles';
import { logOutApi } from '../../services';
import { routes } from '../../utils';

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const { userDetails, token } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (userDetails) {
      setAnchorEl(null);
    }
  }, [userDetails]);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(logOutApi());
    handleClose();
  };

  const NavigationPage = () => {
    navigate(`${routes.general.profile}`, { state: userDetails });
    handleClose();
  };

  const HeaderRight = () => {
    return (
      <>
        {token ? (
          <>
            <p>{userDetails?.fullName}</p>
            <Avtar alt="Remy Sharp" src={Images.logo} onClick={handleClick} />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={NavigationPage}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <NavLinkContainer to={routes.auth.login}>
              <Button text={'login'} color={'info'} />
            </NavLinkContainer>
          </>
        )}
      </>
    );
  };
  const showDrawer = () => {
    return token ? <Drawer /> : <></>;
  };

  return (
    <BoxContainer>
      <AppBar position="fixed" sx={{ backgroundColor: '#21556c' }}>
        <Toolbar>
          {showDrawer()}
          <Link style={{display :'contents'}} to="/">
            <ImageContainer src={Images.logo} alt="not found" />
            <Typography variant="h6" component="span" sx={{ flexGrow: 1, color: '#FFF' }}>
              ThoughtWin
            </Typography>
          </Link>
          {HeaderRight()}
        </Toolbar>
      </AppBar>
    </BoxContainer>
  );
};
