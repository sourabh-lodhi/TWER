import React from "react";

import { InputField, Span } from "./Input.Style";

export const Input = ({
  id,
  label,
  name,
  autoComplete,
  type,
  onChange,
  errorMessage,
  value,
  disabled,
}) => {
  return (
    <>
      <InputField
        margin="normal"
        required
        fullWidth
        id={id}
        value={value}
        label={label}
        name={name}
        autoComplete={autoComplete}
        type={type}
        onChange={onChange}
        disabled={disabled}
      />
      <Span>{errorMessage}</Span>
    </>
  );
};
