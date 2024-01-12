import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import {
  DashBoard,
  LeaveRequest,
  Home,
  Login,
  SignUp,
  TotalLeave,
  ProfilePage,
  ApplyLeave,
  UploadTimeSheet,
  CreateNewUser,
} from './screens';
import { Header } from './container';
import { ProtectedRoute, PublicRoute } from './routes';
import { getUserApi, setToken } from './services';
import { getLocalData, routes } from './utils';

function App() {
  const theme = createTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getLocalData('token');
    if (token) {
      dispatch(setToken(token));
      dispatch(getUserApi());
    }
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={routes.auth.login} element={<Login />} />
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={routes.auth.signup} element={<SignUp />} />
            <Route path={routes.auth.createNewUser} element={<CreateNewUser />} />
            <Route path={routes.general.dashboard} element={<DashBoard />} />
            <Route path={routes.leave.applyLeave} element={<ApplyLeave />} />
            <Route path={routes.leave.leaveDetails} element={<ApplyLeave />} />
            <Route
              path={routes.leave.totalLeave}
              element={<TotalLeave isCheck={false} />}
            />
            <Route
              path={routes.leave.checkLeave}
              element={<TotalLeave isCheck={true} />}
            />
            <Route
              path={routes.leave.leaveRequest}
              element={<LeaveRequest />}
            />
            <Route
              path={routes.leave.timeSheet}
              element={<UploadTimeSheet />}
            />
            <Route path={routes.general.profile} element={<ProfilePage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}
export default App;
