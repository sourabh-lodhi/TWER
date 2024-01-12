import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;
  & .box-logo {
    margin-top: 8;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .formgroup {
    margin: 10px 0 18px;
  }
  & .input-field {
    border: 1px solid #ddd;
    font-size: 14px;
    padding: 8px 10px;
    border-radius: 2px;
    width: 25rem;
    height: 2rem;
    &:hover {
      border-color: #999;
    }
    &:focus {
      outline: none;
      box-shadow: none;
      border: 1px solid blue;
    }
  }
  & .input-field[type='checkbox'] {
    margin: auto 10px;
    width: 14px;
  }
  & .error-message {
    color: red;
    font-size: 12px;
  }
  & .form-group {
    position: relative;
    margin-bottom: 5px;
    display: block;
  }
  & .eye-passing {
    position: absolute;
    top: 38px;
    right: 20px;
    cursor: pointer;
  }
  & .span-text {
    color: grey;
    top: 40px;
    right: 15px;
    position: absolute;
  }
  & .label {
    display: block;
    font-size: 15px;
    line-height: 16px;
    margin: 0 0 8px;
    font-weight: 600;
    color: #3a3a3a;
    margin-top: 2%;
  }
  & .button {
    margin-top: 5%;
  }
  & .sgn-btn {
    margin-top: 10%;
  }
  & .pf {
    display: flex;
    margin: 10px auto;
  }
`;
