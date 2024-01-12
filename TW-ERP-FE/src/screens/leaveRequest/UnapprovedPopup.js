import React from 'react';

import { Button, TextArea } from '../../components';
import {
  Wrapper,
  Heading,
  PopUpContainer,
  HeadingText,
  ButtonContainer,
  ButtonWrapper,
  CloseIconContainer,
} from './UnapprovedPopup.style';

export const UnapprovedPopup = ({
  handleSubmit,
  handleClose,
  setComment,
  comment,
}) => {
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Wrapper>
      <Heading>
        <HeadingText>Reason of Unapproval</HeadingText>
        <CloseIconContainer onClick={handleClose} />
      </Heading>
      <PopUpContainer onClick={(e) => e.stopPropagation()}>
        <TextArea height="100px" value={comment} setValue={handleChange} />
        <ButtonWrapper>
          <ButtonContainer>
            <Button text="submit" height="25px" handleOnClick={handleSubmit} />
          </ButtonContainer>
        </ButtonWrapper>
      </PopUpContainer>
    </Wrapper>
  );
};
