import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, CssBaseline, Box, Typography, Container } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Wrapper } from './Login.styles';
import { Button } from '../../components';
import { isCheckEmail, isCheckPassword, Message } from '../../utils';
import { loginApi } from '../../services';

export const Login = () => {
  const { loading } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: { value: '', errorMsg: '' },
    password: { value: '', errorMsg: '' },
  });

  const handleChange = (key, value, formValidations = {}) => {
    switch (key) {
      case 'email':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: isCheckEmail(value),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: isCheckEmail(value),
          },
        };
      case 'password':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: isCheckPassword(value),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: isCheckPassword(value),
          },
        };
      default:
        return {
          ...formValidations,
        };
    }
  };

  const validation = (data) => {
    let formValidations = { ...formData };
    let res = true;
    for (const key in data) {
      const value = data[key];
      formValidations = handleChange(key, value, formValidations);
      if (res) {
        if (formValidations[key] && formValidations[key].errorMsg !== '') {
          res = false;
        }
      }
    }
    setFormData({ ...formValidations });
    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: formData.email.value,
      password: formData.password.value,
    };
    if (validation(data)) {
      data.email = data.email.concat(Message.others.EMAIL_POSTFIX);
      dispatch(loginApi(data));
      setFormData(formData);
    }
  };

  return (
    <Wrapper>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="box-style">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {' '}
            <div>
              <div className="form-group">
                <label className="label">Email</label>
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email.value}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                <p className="span-text" color="disabled">
                  @thoughtwin.com
                </p>
                <span className="error-message">
                  {' '}
                  {formData.email.errorMsg}
                </span>
              </div>
              <div className="pass-form">
                <label className="label">Password</label>
                <input
                  className="input-field"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password *"
                  value={formData.password.value}
                  onChange={(e) => handleChange('password', e.target.value)}
                  autoComplete="on"
                />
                {showPassword ? (
                  <VisibilityOff
                    className="eye-passing"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <RemoveRedEyeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-passing"
                    color="disabled"
                  />
                )}
                <span className="error-message">
                  {formData.password.errorMsg}
                </span>
              </div>
            </div>
            <div className="login-btn">
              <Button
                color={'info'}
                text={'Sign in'}
                isLogin={'true'}
                type={'submit'}
                isLoading={loading}
              />
            </div>
          </Box>
        </div>
      </Container>
    </Wrapper>
  );
};
