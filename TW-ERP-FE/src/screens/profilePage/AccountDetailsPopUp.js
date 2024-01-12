import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Input } from "../../components";
import {updateAcountDetail } from "../../services";
import {
 
  isCheckAadharNo, isCheckAccountNo, isCheckEsiNo, isCheckPanNo,isCheckUanNo

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

export const AccountDetailsPopUp = ({ handleClose ,userAccount }) => {


  const [input, setInput] = useState({
    aadhar_no: { value: userAccount.aadhar_no || "" , errMess: "" },
    account_no: { value: userAccount.account_no || "", errMess: "" },
    esi_no: { value: userAccount.esi_no ||"", errMess: "" },
    pan_no: { value: userAccount.pan_no||"", errMess: "" },
    uan_no: { value: userAccount.uan_no||"", errMess: "" },

  });
  const isDisable={
    aadhar_no: !!userAccount?.aadhar_no,
    account_no: !!userAccount?.account_no ,
    esi_no: !!userAccount?.esi_no ,
    pan_no: !!userAccount?.pan_no,
    uan_no: !!userAccount?.uan_no,
  }

  const dispatch = useDispatch();

  const onChange = (e) => {
    let { name, value } = e?.target;
         value= value.trim()
    switch (name) {
      case "aadhar_no":
        return setInput({
          ...input,
          [name]: {
            value,
            errMess: isCheckAadharNo(value),
          },
        });

      case "account_no":
        return setInput({
          ...input,
          [name]: {
            value,
            errMess: isCheckAccountNo(value),
          },
        });

      case "esi_no":
          return setInput({
            ...input,
            [name]: {
              value,
              errMess: isCheckEsiNo(value),
            },
          });
          case "pan_no":
            return setInput({
              ...input,
              [name]: {
                value,
                errMess: isCheckPanNo(value),
              },
            });
            case "uan_no":
              return setInput({
                ...input,
                [name]: {
                  value,
                  errMess: isCheckUanNo(value),
                },
              });
      default:
        return setInput({ ...input });
    }
  };

  const clearField = () => {
    setInput({
    aadhar_no: { errMess: "" },
    account_no: {  errMess: "" },
    esi_no: {  errMess: "" },
    pan_no: {  errMess: "" },
    uan_no: {  errMess: "" },
    });
    handleClose();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      input.aadhar_no.errMess||
       input.account_no.errMess|| 
       input.esi_no.errMess||
       input.pan_no.errMess||
       input.uan_no.errMess 
    
    ) {
      return;
    }

    const AcountDetailBody = {
      user:userAccount.user,
      aadhar_no: input?.aadhar_no?.value,
      account_no:input?.account_no?.value,
      esi_no: input?.esi_no?.value ,
      pan_no: input?.pan_no?.value,
      uan_no: input?.uan_no?.value,
    };
 
    dispatch(updateAcountDetail(AcountDetailBody));

    clearField();
  };

  return (
    <Wrapper>
      <Heading>
        <HeadingText>Account Detail</HeadingText>
        <CloseIconContainer onClick={handleClose} />
      </Heading>
      <PopUpContainer>
        <FormContainer onSubmit={onSubmit}>
          <InputContainer>
            <Input
              label="Aadhar Number"
              value={input?.aadhar_no.value}
              name="aadhar_no"
              onChange={onChange}
              type="number"
              autoComplete="on"
              disabled={isDisable.aadhar_no}
              errorMessage={input?.aadhar_no?.errMess}
            />
            <Input
              label="Account Number"
              value={input?.account_no?.value}
              name="account_no"
              onChange={onChange}
              type="number"
              autoComplete="on"
              disabled={isDisable?.account_no}  
              errorMessage={input?.account_no?.errMess}
            />
             <Input
              label="PAN Number"
              value={input?.pan_no?.value}
              name="pan_no"
              onChange={onChange}
              type="text"
              autoComplete="on"
              disabled={isDisable?.pan_no}  
              errorMessage={input?.pan_no?.errMess}
            />
            <Input
              label="ESI Number"
              value={input?.esi_no?.value}
              name="esi_no"
              onChange={onChange}
              type="number"
              autoComplete="on"
              disabled={isDisable.esi_no}  
              errorMessage={input?.esi_no?.errMess}
            />
                <Input
              label="UAN Number"
              value={input?.uan_no?.value}
              name="uan_no"
              onChange={onChange}
              type="number"
              autoComplete="on"
              disabled={isDisable.uan_no}  
              errorMessage={input?.uan_no?.errMess}
            />
            <ButtonContainer>
              <Button disabled ={isDisable?.aadhar_no && isDisable?.account_no && isDisable?.esi_no  && isDisable?.pan_no && isDisable?.uan_no} type="submit" text="submit" />
            </ButtonContainer>
          </InputContainer>
        </FormContainer>
      </PopUpContainer>
    </Wrapper>
  );
};
