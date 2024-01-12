import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Paper,
  TableRow,
  TableCell,
  TableContainer as TableContain,
} from "@mui/material";

export const TableContainer = styled(TableContain)`
  width: 100%;
  height: calc(100vh - 138px);
  padding: 25px 0px 0px 25px;
`;
export const Cancelicon = styled.span`
  margin-left: 40px;
`;
export const CancelIconMUI = styled(CancelIcon)`
  fill: red !important;
  &:hover {
    box-shadow: 2px 2px 2px 2px #888888;
    transition: 0.6s all ease !important;
  }
`;
export const AcceptIconMUI = styled(CheckCircleIcon)`
  fill: #0288d1 !important;
  &:hover {
    box-shadow: 2px 2px 2px 2px #888888;
    transition: 0.6s all ease !important;
  }
`;
export const PaperContainer = styled(Paper)`
  width: 100%;
  overflow: hidden;
`;
export const TableRowContainer = styled(TableRow)`
  cursor: pointer;
`;

export const TableCellContainer = styled(TableCell)`
  text-transform: capitalize;
`;
