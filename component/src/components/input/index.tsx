import React from "react";
import '../../assets/scss/app.scss';

interface Field {
  fieldName: string;
  type?: string;
}

interface InputProps {
  field: Field;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ field, onChange }) => {
  return (
    <div>
      <label htmlFor={field.fieldName}>{field.fieldName}</label>
      <input

        type={field.type || "text"}
        name={field.fieldName}
        placeholder={field.fieldName}
        onChange={onChange} // Call the passed onChange function
      />
    </div>
  );
};

export default Input;
