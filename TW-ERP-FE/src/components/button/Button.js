import React from 'react';

import { Loader } from '../loader';
import { ButtonContainer } from './Button.styles';

export const Button = ({
  text,
  color,
  type,
  rightIcon,
  leftIcon,
  handleOnClick,
  fullWidth = true,
  height,
  isLoading,
  className,
  restProps,
  disabled,
  style,
}) => {
  return (
    <>
      <ButtonContainer
        startIcon={isLoading === false && leftIcon}
        endIcon={isLoading === false && rightIcon}
        color={color}
        onClick={handleOnClick}
        variant="contained"
        type={type}
        fullWidth={fullWidth}
        className={className}
        height={height}
        {...restProps}
        style={style}
        disabled={disabled}
      >
        {isLoading ? (
          <Loader loaderSize={18} loaderStyle={{ color: 'inherit' }} />
        ) : (
          text
        )}
      </ButtonContainer>
    </>
  );
};
