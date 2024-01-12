import * as React from 'react';
import { ModalContainer } from './Modal.styles';

export const Modal = ({ children, open, handleClose }) => {
  return (
    <>
      <ModalContainer open={!!open} onClose={handleClose}>
        <>{children}</>
      </ModalContainer>
    </>
  );
};
