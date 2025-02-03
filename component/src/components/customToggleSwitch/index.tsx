import '../../assets/scss/app.scss';
import React, { useState, useEffect } from "react";

interface ToggleSwitchProps {
  label: string;
  name: string;
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  name,
  onChange,
  defaultChecked = false,
}) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleToggle = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <label htmlFor={name} style={{ fontWeight: "500", color: "#4B5563" }}>
        {label}
      </label>
      <div
        onClick={handleToggle}
        style={{
          width: "40px",
          height: "20px",
          background: checked ? "#2563EB" : "#D1D5DB",
          borderRadius: "20px",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            background: "#FFFFFF",
            borderRadius: "50%",
            position: "absolute",
            top: "1px",
            left: checked ? "20px" : "2px",
            transition: "left 0.3s",
          }}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
