import styled from "styled-components";
import { Button as MuiButton } from "@mui/material";

export const ButtonContainer = styled(MuiButton)`
  text-transform: capitalize !important;
  height: ${(props) => props.height} !important;
  &:hover {
    background-color: red !important;
    transition: 0.6s all ease !important;
  }
`;

export const BackButtonMain = styled.div`
  width: 90px;
`;

export const ClearFilterButton = styled.div`
  margin-top: ${(props) => props.marginTop} !important;
  width: 100px;
`;
