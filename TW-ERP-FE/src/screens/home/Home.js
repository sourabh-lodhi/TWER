import React from 'react';

import { Button } from '../../components';
import {
  MainContainer,
  Container,
  HeadingOne,
  HeadingTwo,
  NavLinkContainer,
  ButtonContainer,
} from './Home.styles';
import { Images } from '../../assets';
import { routes } from '../../utils';

export const Home = () => {
  return (
    <MainContainer backgroundImage={Images.background}>
      <Container>
        <HeadingOne>Passion to Innovate</HeadingOne>
        <HeadingTwo className="home_text">
          {' '}
          This is text This is text This is text This is text This is text This
          is text This is text{' '}
        </HeadingTwo>
        <NavLinkContainer to={routes.auth.login}>
          <ButtonContainer>
            <Button text={'sign in'} color={'info'} />
          </ButtonContainer>
        </NavLinkContainer>
      </Container>
    </MainContainer>
  );
};
