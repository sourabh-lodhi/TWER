import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  Container,
  CircularProgress,
  CardContent,
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';

import { Wrapper } from './SignUp.Styles';
import * as validate from '../../utils';
import { Message } from '../../utils';
import { Button, DialogBox, SelectFeild } from '../../components';
import { getUserRole, createUserApi } from '../../services';

export const CreateNewUser = () => {
  const userData = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPF, setIsPF] = useState(false);
  const [super_password, setSuperPassword] = useState({
    error: false,
    value: '',
    errorMsg: '',
  });
  const [salary_password, setSalaryPassword] = useState({
    error: false,
    value: '',
    errorMsg: '',
  });
  const [finalData, setFinalData] = useState({});
  const [formData, setFormData] = useState({
    fullName: { value: '', errorMsg: '' },
    email: { value: '', errorMsg: '' },
    password: { value: '', errorMsg: '' },
    confirmPassword: { value: '', errorMsg: '' },
    DOB: { value: '', errorMsg: '' },
    joiningDate: { value: '', errorMsg: '' },
    allocatedLeaves: { value: '', errorMsg: '' },
    role: { value: '', errorMsg: '' },
    empCode: { value: '', errorMsg: '' },
    salary: { value: '', errorMsg: '' },
  });

  const onSuperPasswordChange = (e) => {
    e.preventDefault();
    setSuperPassword({
      value: e.target.value,
      error: !!!e.target.value,
      errorMsg: !!!e.target.value ? 'HR password is require' : '',
    });
  };

  const onSalaryPasswordChange = (e) => {
    e.preventDefault();
    setSalaryPassword({
      value: e.target.value,
      error: !!!e.target.value,
      errorMsg: !!!e.target.value ? 'Salary password is require' : '',
    });
  };

  const handleChange = (key, value, formValidations = {}) => {
    switch (key) {
      case 'empCode':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isCheckEmpCode(value),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isCheckEmpCode(value),
          },
        };

      case 'fullName':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isCheckFullName(value),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isCheckFullName(value),
          },
        };

      case 'email':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isCheckEmail(value),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isCheckEmail(value),
          },
        };

      case 'allocatedLeaves':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isTotalLeaves(value),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isTotalLeaves(value),
          },
        };

      case 'password':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isCheckPassword(value),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isCheckPassword(value),
          },
        };
      case 'confirmPassword':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isCheckConfirmPassword(
              value,
              formData.password.value
            ),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isCheckConfirmPassword(
              value,
              formData.password.value
            ),
          },
        };
      case 'DOB':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isCheckRequired(value, 'DOB'),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isCheckRequired(value, 'DOB'),
          },
        };
      case 'joiningDate':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isCheckRequired(value, 'joiningDate'),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isCheckRequired(value, 'joiningDate'),
          },
        };

      case 'salary':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isCheckSalary(value),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isCheckSalary(value),
          },
        };
      case 'role':
        setFormData({
          ...formData,
          [key]: {
            value: value,
            errorMsg: validate.isCheckRequired(value, 'role'),
          },
        });
        return {
          ...formValidations,
          [key]: {
            value: value,
            errorMsg: validate.isCheckRequired(value, 'role'),
          },
        };
      default:
        return {
          ...formValidations,
        };
    }
  };

  function addPrefix(empCode) {
    if (empCode.length === 1) {
      return '000'.concat(empCode);
    } else if (empCode.length === 2) {
      return '00'.concat(empCode);
    } else if (empCode.length === 3) {
      return '0'.concat(empCode);
    } else {
      return empCode;
    }
  }
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
    setIsLoader(true);
    delete formData?.confirmPassword?.value;
    const empCodeWithPrefix = addPrefix(formData.empCode.value);
    formData.empCode.value = empCodeWithPrefix;

    const data = {
      fullName: formData.fullName.value,
      email: formData.email.value,
      password: formData.password.value,
      DOB: formData.DOB.value,
      joiningDate: formData.joiningDate.value,
      allocatedLeaves: formData.allocatedLeaves.value,
      role: formData.role.value,
      empCode: formData.empCode.value,
      salary: formData.salary.value,
      pf_status: isPF,
    };

    if (validation(data)) {
      data.email = data.email.concat(Message.others.EMAIL_POSTFIX);
      setOpen(true);
      setFinalData(data);
      setIsLoader(false);
    }
    setIsLoader(false);
  };

  useEffect(() => {
    if (userData.success) {
      setFormData({
        fullName: { value: '', errorMsg: '' },
        email: { value: '', errorMsg: '' },
        password: { value: '', errorMsg: '' },
        confirmPassword: { value: '', errorMsg: '' },
        DOB: { value: '', errorMsg: '' },
        joiningDate: { value: '', errorMsg: '' },
        allocatedLeaves: { value: '', errorMsg: '' },
        role: { value: '', errorMsg: '' },
        empCode: { value: '', errorMsg: '' },
        salary: { value: '', errorMsg: '' },
      });
      setIsPF('');
      setSalaryPassword('');
      setSuperPassword('');
    }
    window.scroll(0, 5);
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    dispatch(getUserRole());
  }, [dispatch]);

  const selectedValue =
    roles?.map((e) => e)?.filter((e) => e?.role_slug === formData.role.value)[0]
      ?.role_slug || '';

  const convertOptions = roles?.map((e) => {
    return { label: e?.name, value: e?.role_slug };
  });

  const Loader = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  };

  const submitUser = (e) => {
    e.preventDefault();
    if (!super_password?.value) {
      setSuperPassword({
        ...super_password,
        error: true,
        errorMsg: 'Hr password is required.',
      });
    }
    if (!salary_password?.value) {
      setSalaryPassword({
        ...salary_password,
        error: true,
        errorMsg: 'Salary password is required.',
      });
    }

    finalData.super_password = super_password?.value;
    finalData.salary_password = salary_password?.value;

    setIsLoader(true);
    setOpen(false);
    dispatch(createUserApi(finalData));
    setFormData({
      fullName: { value: '', errorMsg: '' },
      email: { value: '', errorMsg: '' },
      password: { value: '', errorMsg: '' },
      confirmPassword: { value: '', errorMsg: '' },
      DOB: { value: '', errorMsg: '' },
      joiningDate: { value: '', errorMsg: '' },
      allocatedLeaves: { value: '', errorMsg: '' },
      role: { value: '', errorMsg: '' },
      empCode: { value: '', errorMsg: '' },
      salary: { value: '', errorMsg: '' },
    });
    setFormData({ ...formData, confirmPassword: formData.password.value });
    setIsLoader(false);
  };

  return (
    <>
      <Wrapper>
        <Container component="main" maxWidth="xs">
          <div className="box-logo">
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register New User
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <div>
                <label className="label">Employee Code*</label>
                <input
                  className="input-field"
                  type="number"
                  name="empCode"
                  value={formData.empCode.value || ''}
                  onChange={(e) => handleChange('empCode', e.target.value)}
                />
                <span className="error-message">
                  {formData.empCode.errorMsg}
                </span>
                <div className="form-group">
                  <label className="label">Full Name*</label>
                  <input
                    className="input-field"
                    type="text"
                    name="fullName"
                    value={formData.fullName.value || ''}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                  />
                </div>
                <span className="error-message">
                  {formData.fullName.errorMsg}
                </span>
                <div className="form-group">
                  <label className="label">Email*</label>
                  <input
                    className="input-field"
                    type="email"
                    name="email"
                    value={formData.email.value || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  <span className="span-text" color="disabled">
                    @thoughtwin.com
                  </span>
                  <span className="error-message">
                    {formData.email.errorMsg}
                  </span>
                </div>
                <div className="form-group">
                  <label className="label">Password*</label>
                  <input
                    className="input-field"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password.value || ''}
                    onChange={(e) => handleChange('password', e.target.value)}
                    autoComplete="off"
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
                <div className="form-group">
                  <label className="label">Confirm Password*</label>
                  <input
                    className="input-field"
                    type={visiblePassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData?.confirmPassword?.value || ''}
                    onChange={(e) =>
                      handleChange('confirmPassword', e.target.value)
                    }
                    autoComplete="off"
                  />
                  {visiblePassword ? (
                    <VisibilityOff
                      className="eye-passing"
                      onClick={() => setVisiblePassword(!visiblePassword)}
                    />
                  ) : (
                    <RemoveRedEyeIcon
                      onClick={() => setVisiblePassword(!visiblePassword)}
                      className="eye-passing"
                      color="disabled"
                    />
                  )}
                  <span className="error-message">
                    {formData.confirmPassword.errorMsg}
                  </span>
                </div>
                <label className="label">DOB*</label>
                <input
                  className="input-field"
                  type="date"
                  name="DOB"
                  value={formData.DOB.value || ''}
                  onChange={(e) => handleChange('DOB', e.target.value)}
                />
                <span className="error-message">{formData.DOB.errorMsg}</span>
                <label className="label">Joining Date*</label>
                <input
                  className="input-field"
                  type="date"
                  name="joiningDate"
                  min={formData.joiningDate.value}
                  value={formData.joiningDate.value || ''}
                  onChange={(e) => handleChange('joiningDate', e.target.value)}
                />
                <span className="error-message">
                  {formData.joiningDate.errorMsg}
                </span>
                <label className="label">Allocated Leave*</label>
                <input
                  className="input-field"
                  type="number"
                  name="allocatedLeaves"
                  value={formData.allocatedLeaves.value || ''}
                  min={0}
                  onChange={(e) =>
                    handleChange('allocatedLeaves', e.target.value)
                  }
                />
                <span className="error-message">
                  {formData.allocatedLeaves.errorMsg}
                </span>
                <label className="label">Salary*</label>
                <input
                  className="input-field"
                  type="number"
                  name="salary"
                  value={formData.salary.value || ''}
                  min={0}
                  onChange={(e) => handleChange('salary', e.target.value)}
                />
                <span className="error-message">
                  {formData.salary.errorMsg}
                </span>
                <div className="pf">
                  <div className="form-group">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <label style={{ margin: 0 }} className="label">
                        PF Status
                      </label>
                      <input
                        className="input-field"
                        type="checkbox"
                        name="pf_status"
                        value={isPF || ''}
                        checked={isPF}
                        onChange={(e) => setIsPF(e.target.checked)}
                      />
                    </Box>
                  </div>
                </div>
                <label className="label">Role*</label>
                <SelectFeild
                  handleChange={(e) => handleChange('role', e.target.value)}
                  label="Role"
                  name="role"
                  options={convertOptions}
                  selectedValue={selectedValue}
                  errorMessage={
                    <span className="error-message">
                      {formData.role.errorMsg}
                    </span>
                  }
                />
              </div>
              <div className="sgn-btn">
                <Button
                  height="3rem"
                  text={!isLoader && !isLoader ? `Register` : <Loader />}
                  isLogin={'true'}
                  color="info"
                  type="submit"
                />
              </div>
            </Box>
          </div>
        </Container>
      </Wrapper>
      <DialogBox
        open={open}
        setOpen={setOpen}
        title="Enter HR Password and Salary Password"
      >
        <Box className="content-center">
          <Card sx={{ zIndex: 1 }}>
            <CardContent>
              <form noValidate autoComplete="off" onSubmit={submitUser}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>

                  <OutlinedInput
                    id="outlined-adornment-password"
                    value={super_password?.value || ''}
                    onChange={onSuperPasswordChange}
                    label="Password"
                    error={!!super_password.error && !!super_password.errorMsg}
                    variant="standard"
                  />
                </FormControl>
                <Box
                  sx={{
                    color: 'red',
                    fontSize: '12px',
                    marginBottom: '1.1rem',
                  }}
                >
                  {super_password.errorMsg}
                </Box>
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    HR Salary Password
                  </InputLabel>

                  <OutlinedInput
                    id="outlined-adornment-password"
                    value={salary_password.value || ''}
                    onChange={onSalaryPasswordChange}
                    label="HR Salary Password"
                    error={
                      !!salary_password.error && !!salary_password.errorMsg
                    }
                    variant="standard"
                  />
                </FormControl>
                <Box
                  sx={{
                    color: 'red',
                    fontSize: '12px',
                    marginBottom: '1.1rem',
                  }}
                >
                  {salary_password.errorMsg}
                </Box>
                <Button
                  text={`Submit`}
                  isLogin={'true'}
                  color="success"
                  type="submit"
                />
              </form>
            </CardContent>
          </Card>
        </Box>
      </DialogBox>
    </>
  );
};
