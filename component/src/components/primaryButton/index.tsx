  import React from "react";  
  import '../../assets/scss/app.scss';

  interface ButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
  }

  const PrimaryButton: React.FC<ButtonProps> = ({
    label,
    type = "submit",
    onClick,
    disabled = false,
  }) => {  

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled} 
        className={`button ${disabled ? 'disabled' : ""}`}
        >
        {label}
      </button>
    );
  };

  export default PrimaryButton;
