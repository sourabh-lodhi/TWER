import styled from "styled-components";
import { TableCell } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const Container = styled.div`
  padding-top: 25px;
  padding-left: 25px;
`;
export const StyleMain = styled.div`
  padding: 25px;
`;

export const StyleText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StyleHead = styled(TableCell)`
   display: flex;
   border: none;
`  
export const AcceptIconMUI = styled(CheckCircleIcon)`
  fill: #0288d1 !important;
  &:hover {
    box-shadow: 2px 2px 2px 2px #888888;
    transition: 0.6s all ease !important;
  }
`;
export const CancelIconMUI = styled(CancelIcon)`
  fill: red !important;
  &:hover {
    box-shadow: 2px 2px 2px 2px #888888;
    transition: 0.6s all ease !important;
  }
`;
