import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const MainContainer = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  width: 100%;
  height: calc(100vh - 64px);
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Container = styled.div`
  padding: 197px 0px 0px 112px;
`;

export const HeadingOne = styled.p`
  color: white;
  font-size: 56px;
  line-height: 60px;
  letter-spacing: -0.03em;
  margin: 0;
  font-family: "Akshar", "sans-serif";
`;

export const HeadingTwo = styled.p`
  color: whitesmoke;
  width: 446px;
  font-family: "Akshar", "sans-serif";
  font-size: 20px;
  margin: 5px 0px;

  @media screen and (max-width: 600px) {
    width: 200px;
  }
`;
export const NavLinkContainer = styled(NavLink)`
  text-decoration: none;
`;
export const ButtonContainer = styled.div`
  width: 90px;
`;
