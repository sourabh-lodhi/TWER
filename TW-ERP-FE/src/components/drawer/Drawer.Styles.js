import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import { Box } from "@mui/material";

export const NavLinkContainer = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

export const MenuIconContainer = styled(MenuIcon)`
  margin-right: 30px;
  cursor: pointer;
`;
export const BoxContainer = styled(Box)`
  width: 250;
`;
