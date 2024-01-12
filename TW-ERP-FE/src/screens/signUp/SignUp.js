import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';

import { Wrapper } from './SignUp.Styles';
import * as validate from '../../utils';
import { Message } from '../../utils';
import { Button, SelectFeild } from '../../components';
import { getUserRole, createUserApi } from '../../services';

export const SignUp = () => {
  const userData = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state?.auth);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    DOB: '',
    joiningDate: '',
    allocatedLeaves: '',
    role: '',
    empCode: '',
    salary: 0,
    pf_status: false,
  });

  const handleChange = (e) => {
    const customFieldObj = {
      [e.target.name]:
        e.target[e.target.name === 'pf_status' ? 'checked' : 'value'],
    };

    if (e.target.name === 'salary') {
      customFieldObj['salary'] = Number(e.target.value);
    }
    setFormData({ ...formData, ...customFieldObj });
    handleValidation({ ...formData, ...customFieldObj });
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

  const handleValidation = (signupData) => {
    let isValid = true;
    let err = {};
    if (signupData) {
      let { valid: empValid, errMsg: empErr } = validate.checkEmpCode(
        signupData.empCode
      );
      if (!empValid) isValid = false;
      err.empCode = empErr;

      let { valid: nameValid, errMsg: nameErr } = validate.checkFullName(
        signupData.fullName
      );
      if (!nameValid) isValid = false;
      err.fullName = nameErr;

      let { valid: salaryValid, errMsg: salaryErr } = validate.checkSalary(
        signupData.salary
      );
      if (!salaryValid) isValid = false;
      err.salary = salaryErr;

      let { valid: emailValid, errMsg: emailErr } = validate.checkEmail(
        signupData.email
      );
      if (!emailValid) isValid = false;
      err.email = emailErr;
      let { valid: passwordValid, errMsg: passwordErr } =
        validate.checkPassword(signupData.password);
      if (!passwordValid) isValid = false;
      err.password = passwordErr;
      let { valid: confirmPassword, errMsg: confirmErr } =
        validate.checkConfirmPassword(
          signupData.confirmPassword,
          signupData.password
        );
      if (!confirmPassword) isValid = false;
      err.confirmPassword = confirmErr;
      let { valid: DOBValid, errMsg: DOBErr } = validate.checkRequired(
        signupData.DOB,
        'DOB'
      );
      if (!DOBValid) isValid = false;
      err.DOB = DOBErr;
      let { valid: joiningValid, errMsg: joiningErr } = validate.checkRequired(
        signupData.joiningDate,
        'joiningDate'
      );
      if (!joiningValid) isValid = false;
      err.joiningDate = joiningErr;
      let { valid: leavesValid, errMsg: leavesErr } = validate.totalLeaves(
        signupData.allocatedLeaves
      );
      if (!leavesValid) isValid = false;
      err.allocatedLeaves = leavesErr;
      let { valid: roleValid, errMsg: roleErr } = validate.checkRequired(
        signupData.role,
        'role'
      );
      if (!roleValid) isValid = false;
      err.role = roleErr;
    }
    setErrors({ ...err });
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation(formData)) {
      return;
    }
    delete formData.confirmPassword;
    let userEmail = formData?.email?.concat(Message.others.EMAIL_POSTFIX);
    formData.email = userEmail;

    const empCodeWithPrefix = addPrefix(formData.empCode);
    formData.empCode = empCodeWithPrefix;
    setFormData(formData);
    dispatch(createUserApi(formData));
    setFormData({ ...formData, confirmPassword: formData.password });
  };

  useEffect(() => {
    if (userData.error) {
      setFormData({
        ...formData,
        email: formData.email.replace(Message.others.EMAIL_POSTFIX, ''),
      });
    }
    if (userData.success) {
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        DOB: '',
        joiningDate: '',
        allocatedLeaves: '',
        role: '',
        empCode: '',
        salary: '',
        pf_status: false,
      });
    }
    window.scroll(0, 5);
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    dispatch(getUserRole());
  }, [dispatch]);

  const selectedValue =
    roles?.map((e) => e)?.filter((e) => e?.role_slug === formData.role)[0]
      ?.role_slug || '';

  const convertOptions = roles?.map((e) => {
    return { label: e?.name, value: e?.role_slug };
  });

  return (
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
              <label className="label">Employee Code</label>
              <input
                className="input-field"
                type="number"
                name="empCode"
                placeholder="Employee Code *"
                value={formData.empCode}
                onChange={handleChange}
              />
              <span className="error-message">{errors.empCode}</span>
              <div className="form-group">
                <label className="label">Full Name</label>
                <input
                  className="input-field"
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <span className="error-message">{errors.fullName}</span>
              <div className="form-group">
                <label className="label">Email</label>
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="span-text" color="disabled">
                  @thoughtwin.com
                </span>
                <span className="error-message">{errors.email}</span>
              </div>
              <div className="form-group">
                <label className="label">Password</label>
                <input
                  className="input-field"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
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
                <span className="error-message">{errors.password}</span>
              </div>
              <div className="form-group">
                <label className="label">Confirm Password</label>
                <input
                  className="input-field"
                  type={visiblePassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password *"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                <span className="error-message">{errors.confirmPassword}</span>
              </div>
              <div className="form-group">
                <label className="label">DOB</label>
                <input
                  className="input-field"
                  type="date"
                  name="DOB"
                  placeholder=" DOB *"
                  value={formData.DOB}
                  onChange={handleChange}
                />
              </div>
              <span className="error-message">{errors.DOB}</span>
              <div className="form-group">
                <label className="label">Joining Date</label>
                <input
                  className="input-field"
                  type="date"
                  name="joiningDate"
                  placeholder="Date of Joining"
                  min={formData.DOB}
                  value={formData.joiningDate}
                  onChange={handleChange}
                />
              </div>
              <span className="error-message">{errors.joiningDate}</span>
              <div className="form-group">
                <label className="label">Allocated Leave</label>
                <input
                  className="input-field"
                  type="number"
                  name="allocatedLeaves"
                  placeholder="Total Leaves"
                  value={formData.allocatedLeaves}
                  min={0}
                  onChange={handleChange}
                />
              </div>
              <span className="error-message">{errors.allocatedLeaves}</span>
              <label className="label">Salary</label>
              <input
                className="input-field"
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                min={0}
                onChange={handleChange}
              />
              <span className="error-message">{errors.salary}</span>
              <div className="pf">
                <div className="form-group">
                  <label className="label">PF Status</label>
                  <input
                    className="input-field"
                    type="checkbox"
                    name="pf_status"
                    placeholder="PF_Status"
                    checked={formData.pf_status}
                    min={0}
                    onChange={handleChange}
                  />
                  <span className="error-message">{errors.pf_status}</span>
                </div>
              </div>
              <div className="form-group">
                <label className="label">Role</label>
                <SelectFeild
                  handleChange={handleChange}
                  label="Role"
                  name="role"
                  options={convertOptions}
                  selectedValue={selectedValue}
                  signup={'true'}
                  issignup={'true'}
                />
              </div>
              <span className="error-message">{errors.role}</span>
            </div>
            <div className="sgn-btn">
              <Button
                text="Register"
                isLogin={'true'}
                color="info"
                type="submit"
              />
            </div>
          </Box>
        </div>
      </Container>
    </Wrapper>
  );
};
