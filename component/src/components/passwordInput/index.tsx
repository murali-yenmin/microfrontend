import React, { useState } from "react";
import '../../assets/scss/app.scss';

interface Field {
  fieldName: string;
}

interface PasswordInputProps {
  field: Field;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ field, onChange }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <label htmlFor={field.fieldName}>{field.fieldName}</label>
      <div style={{ position: "relative", width: "fit-content" }}>
        <input
          type={!visible ? "password" : "text"}
          name={field.fieldName}
          placeholder={field.fieldName}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {visible ? "👁️" : "🙈"}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
