import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

export const Wrapper = styled.div`
  background: white;
  width: 300px;
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

export const PopUpContainer = styled.div`
  padding: 8px 8px;
`;

export const HeadingText = styled.div`
  color: white;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
  width: 65px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const CloseIconContainer = styled(CloseIcon)`
  color: white;
  width: 18px !important;
  height: 18px !important;
  cursor: pointer;
`;
