import React from "react";
import { TextField, Box } from "@mui/material";

export const TextArea = ({ value, setValue, disabled, height }) => {
  return (
    <Box>
      <TextField
        fullWidth
        multiline
        id="fullWidth"
        onChange={setValue}
        value={value}
        inputProps={{ style: { height: height, overflow: "auto" } }}
        disabled={disabled}
      />
    </Box>
  );
};
