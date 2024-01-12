import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Input } from '../../components';
import { generateOrChangeSalaryPassword } from '../../services';
import { isCheckPassword, isEmptyField } from '../../utils';
import {
  Wrapper,
  Heading,
  HeadingText,
  CloseIconContainer,
  PopUpContainer,
  InputContainer,
  ButtonContainer,
  FormContainer,
} from './SalaryPasswordPopUp.Styles';

export const SalaryPasswordPopUp = ({ handleClose }) => {
  const [input, setInput] = useState({
    salary_password: { value: '', errMess: '' },
    password: { value: '', errMess: '' },
  });

  const dispatch = useDispatch();

  const clearField = () => {
    setInput({
      salary_password: { errMess: "", value: "" },
      password: { errMess: "", value: "" },
    });
    handleClose();
  };

  const onChange = (e) => {
    const { name, value } = e?.target;

    switch (name) {
      case 'salary_password':
        return setInput({
          ...input,
          [name]: {
            value,
            errMess: isCheckPassword(value),
          },
        });
      case 'password':
        return setInput({
          ...input,
          [name]: {
            value,
            errMess: isEmptyField(value),
          },
        });
      default:
        return setInput({ ...input });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input?.password?.errMess || input?.salary_password?.errMess) {
      return;
    }
    const salaryPasswordPayload = {
      password: input.password.value,
      salary_password: input.salary_password.value,
    };
    dispatch(generateOrChangeSalaryPassword(salaryPasswordPayload));
    clearField();
    handleClose();

  };

  return (
    <Wrapper>
      <Heading>
        <HeadingText>Generate Salary Password</HeadingText>
        <CloseIconContainer onClick={handleClose} />
      </Heading>
      <PopUpContainer>
        <FormContainer onSubmit={onSubmit}>
          <InputContainer>
            <Input
              label="Salary Password"
              value={input?.salary_password?.value}
              name="salary_password"
              onChange={onChange}
              type="password"
              autoComplete="on"
              errorMessage={input?.salary_password?.errMess}
            />
            <Input
              label="Current Password"
              value={input?.password?.value}
              name="password"
              onChange={onChange}
              type="password"
              autoComplete="on"
              errorMessage={input?.password?.errMess}
            />
            <ButtonContainer>
              <Button type="submit" text="submit" />
            </ButtonContainer>
          </InputContainer>
        </FormContainer>
      </PopUpContainer>
    </Wrapper>
  );
};
