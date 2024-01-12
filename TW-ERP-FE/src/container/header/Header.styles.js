import styled from "styled-components";
import { Avatar as avtar, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export const ImageContainer = styled.img`
  border-radius: 5px;
  height: 25px;
  width: 30px;
  margin-right: 13px;
`;

export const Avtar = styled(avtar)`
  margin-left: 20px;
  cursor: pointer;
`;
export const NavLinkContainer = styled(NavLink)`
  text-decoration: none;
  margin-right: 10px;
`;
export const BoxContainer = styled(Box)`
  flex-grow: 1;
  height: 64px;
`;
