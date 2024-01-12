import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";
import styled from "styled-components";

export const Wrapper = styled(Box)`
  width: 100%;
  typography: body1;
`;

export const TabMainContainer = styled(Box)`
display : flex
  borderbottom: 1;
  bordercolor: divider;
`;

export const TabContainer = styled(Tab)`
  width: 100% !important;
  text-transform: capitalize !important;
`;
