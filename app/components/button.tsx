import React from 'react';

type ButtoncomponentProps = {
  text: string;
  onClickAction: () => void;
  disabled: boolean;
  className?: string;
};

const Buttoncomponent: React.FC<ButtoncomponentProps> = ({ text, onClickAction, disabled, className }) => {
  return (
    <button className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ${className}`} disabled={disabled} onClick={onClickAction}>
      {text}
    </button>
  );
};

export default Buttoncomponent;