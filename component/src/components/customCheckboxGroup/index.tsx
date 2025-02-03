import '../../assets/scss/app.scss';
import React, { useState, useEffect } from "react";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupInputProps {
  label: string;
  name: string;
  options: CheckboxOption[];
  onChange?: (selectedValues: string[]) => void;
  defaultChecked?: string[];
}

const CheckboxGroupInput: React.FC<CheckboxGroupInputProps> = ({
  label,
  name,
  options,
  onChange,
  defaultChecked = [],
}) => {
  const [selectedValues, setSelectedValues] =
    useState<string[]>(defaultChecked);

  useEffect(() => {
    setSelectedValues(defaultChecked);
  }, [defaultChecked]);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const newValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);
    setSelectedValues(newValues);
    if (onChange) {
      onChange(newValues);
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
              type="checkbox"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={(e) =>
                handleCheckboxChange(option.value, e.target.checked)
              }
              style={{
                width: "16px",
                height: "16px",
                color: "#2563EB",
                border: "1px solid #D1D5DB",
                borderRadius: "4px",
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

export default CheckboxGroupInput;
