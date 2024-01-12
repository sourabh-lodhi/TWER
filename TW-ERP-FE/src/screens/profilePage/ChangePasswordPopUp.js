import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Input } from "../../components";
import { changePassword } from "../../services";
import {
  isCheckConfirmPassword,
  isCheckPassword,
  isEmptyField,
  Message,
} from "../../utils";
import {
  Wrapper,
  Heading,
  HeadingText,
  CloseIconContainer,
  PopUpContainer,
  InputContainer,
  ButtonContainer,
  FormContainer,
} from "./SalaryPasswordPopUp.Styles";

export const ChangePasswordPopUp = ({ handleClose }) => {
  const [input, setInput] = useState({
    current_password: { value: "", errMess: "" },
    new_password: { value: "", errMess: "" },
    confirm_password: { value: "", errMess: "" },
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e?.target;
    switch (name) {
      case "current_password":
        return setInput({
          ...input,
          [name]: {
            value,
            errMess: isEmptyField(value),
          },
        });

      case "new_password":
        return setInput({
          ...input,
          [name]: {
            value,
            errMess: isCheckPassword(value, input?.confirm_password?.value),
          },
        });

      case "confirm_password":
        return setInput({
          ...input,
          [name]: {
            value,
            errMess: isCheckConfirmPassword(value, input?.new_password?.value),
          },
        });

      default:
        return setInput({ ...input });
    }
  };

  const clearField = () => {
    setInput({
      confirm_password: { errMess: "", value: "" },
      current_password: { errMess: "", value: "" },
      new_password: { errMess: "", value: "" },
    });
    handleClose();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      input.confirm_password.errMess ||
      input.current_password.errMess ||
      input.new_password.errMess
    ) {
      return;
    }

    if (input.confirm_password.value !== input.new_password.value) {
      setInput({
        ...input,
        confirm_password: {
          ...input.confirm_password,
          errMess: Message.errors.USER_PASSWORD_CONFORMATION,
        },
      });
    }

    const changePasswordBody = {
      password: input?.current_password?.value,
      new_password: input?.new_password?.value,
    };

    dispatch(changePassword(changePasswordBody));

    clearField();
  };

  return (
    <Wrapper>
      <Heading>
        <HeadingText>Change Password</HeadingText>
        <CloseIconContainer onClick={handleClose} />
      </Heading>
      <PopUpContainer>
        <FormContainer onSubmit={onSubmit}>
          <InputContainer>
            <Input
              label="Current Password"
              value={input?.current_password.value}
              name="current_password"
              onChange={onChange}
              type="password"
              autoComplete="off"
              errorMessage={input?.current_password?.errMess}
            />
            <Input
              label="New Password"
              value={input?.new_password?.value}
              name="new_password"
              onChange={onChange}
              type="password"
              autoComplete="off"
              errorMessage={input?.new_password?.errMess}
            />
            <Input
              label="Confirm Password"
              value={input?.confirm_password?.value}
              name="confirm_password"
              onChange={onChange}
              type="password"
              autoComplete="off"
              errorMessage={input?.confirm_password?.errMess}
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
