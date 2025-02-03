import React from "react";
import '../../assets/scss/app.scss';
interface Field {
  fieldName: string;
}

interface TextAreaInputProps {
  field: Field;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ field, onChange }) => {
  return (
    <div>
      <label htmlFor={field.fieldName}>{field.fieldName}</label>
      <textarea
        id={field.fieldName}
        name={field.fieldName}
        autoComplete="off"
        onChange={onChange}
        placeholder={field.fieldName}
      />
    </div>
  );
};

export default TextAreaInput;
