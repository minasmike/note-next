'use client'
import React from 'react';
import Button from '@mui/material/Button';

type SubmitButtonProps = {
  text: string;
  disabled: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, disabled }) => {
  return (
    <Button color="primary" variant="contained" type="submit" disabled={disabled}>
      {text}
    </Button>
  );
};

export default SubmitButton;
