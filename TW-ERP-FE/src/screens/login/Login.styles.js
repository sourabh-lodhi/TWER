import styled from "styled-components";

export const Wrapper = styled.div`
  display: block;
  & .input-field {
    border: 1px solid #ddd;
    font-size: 14px;
    padding: 8px 10px;
    border-radius: 2px;
    width: 25rem;
    height: 3.5rem;
    &:hover {
      border-color: #999;
    }
    &:focus {
      outline: none;
      box-shadow: none;
      border: 1px solid blue;
    }
  }
  & .error-message {
    color: red;
    font-size: 12px;
  }
  & .pass-form {
    position: relative;
    margin-bottom: 5px;
    display: block;
    margin-top: 1.5rem;
  }
  & .form-group {
    position: relative;
    margin-bottom: 5px;
    display: block;
  }
  & .span-text {
    color: grey;
    top: 24px;
    right: 15px;
    position: absolute;
  }
  & .eye-passing {
    color: grey;
    top: 40px;
    right: 15px;
    position: absolute;
  }
  & .label {
    display: block;
    font-size: 16px;
    line-height: 16px;
    margin: 0 0 8px;
    font-weight: 500;
    color: #444;
  }
  & .login-btn {
    margin: 15px 0px;
  }
  & .box-style {
    margin-top: 15;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
