import '../../assets/scss/app.scss';
import React, { useState, useEffect } from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupInputProps {
  label: string;
  name: string;
  options: RadioOption[];
  onChange?: (selectedValue: string) => void;
  defaultChecked?: string;
}

const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
  label,
  name,
  options,
  onChange,
  defaultChecked = "",
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultChecked);

  useEffect(() => {
    setSelectedValue(defaultChecked);
  }, [defaultChecked]);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label htmlFor={name} style={{ fontWeight: "500", color: "#4B5563" }}>
        {label}
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {options.map((option, index) => (
          <label
            key={`${name}-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleRadioChange(option.value)}
              style={{
                width: "16px",
                height: "16px",
                color: "#2563EB",
                border: "1px solid #D1D5DB",
                borderRadius: "50%",
                outline: "none",
              }}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroupInput;
