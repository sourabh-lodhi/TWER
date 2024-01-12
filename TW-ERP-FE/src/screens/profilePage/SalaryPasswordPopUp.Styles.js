import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

export const Wrapper = styled.div`
  background: white;
  width: 472px;
  border-radius: 10px;
`;
export const Heading = styled.div`
  background: #21556c;
  height: 30px;
  border-radius: 9px 9px 0px 0px;
  display: flex;
  justify-content: space-between;
  padding: 10px 8px 0px;
`;

export const HeadingText = styled.div`
  color: white;
`;

export const CloseIconContainer = styled(CloseIcon)`
  color: white;
  width: 18px !important;
  height: 18px !important;
  cursor: pointer;
`;

export const PopUpContainer = styled.div`
  padding: 12px 20px;
`;

export const InputContainer = styled.div`
  max-width: 320px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  margin-top: 23px;
`;
