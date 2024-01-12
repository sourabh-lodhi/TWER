import React from "react";

import { NavLinkContainer, TileContainer } from "./Tile.styles";

export const Tile = ({ name, path }) => {
  return (
    <>
      <NavLinkContainer to={path}>
        <TileContainer>{name}</TileContainer>
      </NavLinkContainer>
    </>
  );
};
