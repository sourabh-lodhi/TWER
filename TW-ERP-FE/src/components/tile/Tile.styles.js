import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavLinkContainer = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
export const TileContainer = styled.div`
  width: 250px;
  border-radius: 15px;
  height: 250px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  cursor: pointer;
  font-weight: 600;
  background-color: aliceblue;
  text-decoration: none;
  &:hover {
    background-color: #21556c;
    color: white;
    transition: 1s all ease;
  }
`;
