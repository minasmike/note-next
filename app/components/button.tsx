'use client'
import React from 'react';


type SubmitButtonProps = {
  text: string;
  disabled: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, disabled }) => {
  return (
    <button color="primary" type="submit" disabled={disabled}>
      {text}
    </button>
  );
};

export default SubmitButton;
