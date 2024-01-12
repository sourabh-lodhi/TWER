import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

export const MultiInput = ({ ...props }) => {
  const {
    selectedTags,
    placeholder,
    tags,
    disabled,
    defaultValue = [],
    rest = [],
    defaultDisable,
    label,
    name,
    ...other
  } = props;

  const onChange = (chips) => {
    selectedTags(chips, name);
  };
  return (
    <Autocomplete
      multiple
      options={[]}
      freeSolo
      disabled={disabled}
      disableClearable
      value={rest}
      id={other.id}
      defaultValue={[...defaultValue]}
      onChange={(e, value) => onChange(value)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const defaultProps = { ...getTagProps({ index }) };
          if ((defaultValue.includes(option) && defaultDisable) || disabled) {
            defaultProps.disabled = true;
            defaultProps.onDelete = null;
          }

          return (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...defaultProps}
            />
          );
        })
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                e.stopPropagation();
              }
            }}
            label={label}
            placeholder={`${!disabled ? 'Add a email by pressing enter' : ''}`}
          />
        );
      }}
    />
  );
};
