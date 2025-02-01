declare module "Components/Input" {
  import React from "react";

  export type InputProps = {
    field: {
      fieldName: string;
      type?: string;
    };
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const Input: React.FC<InputProps>;
  export default Input;
}

declare module "Components/TextArea" {
  import React from "react";

  export type TextArea = {
    field: {
      fieldName: string;
    };
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };

  const TextArea: React.FC<TextArea>;
  export default TextArea;
}

declare module "Components/SelectDropdown" {
  import React from "react";

  export type SelectDropdown = {
    options: Array<Record<string, any>>;
    onSelect: (value: any) => void;
    searchable?: boolean;
    value?: any;
    placeholder?: string;
    disabled?: boolean;
  };

  const SelectDropdown: React.FC<SelectDropdown>;
  export default SelectDropdown;
}

declare module "Components/PasswordInput" {
  import React from "react";

  export type PasswordInputProps = {
    field: {
      fieldName: string;
    }
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const PasswordInput: React.FC<PasswordInputProps>;
  export default PasswordInput;
}

declare module "Components/FileUpload" {
  import React from "react";

  export type fileUploadProps = {
    id: string;
    name: string;
    label: string;
    allowedFileTypes?: string[]; // Allow custom file types (e.g., ['image/png', 'image/jpeg'])
  };

  const FileUpload: React.FC<fileUploadProps>;
  export default FileUpload;
}

declare module "Components/CustomDatePicker" {
  import React from "react";

  export type CustomDatePickerProps = {
    value: Date | DateObject | null | undefined;
    onChange: Function;
    id?: string;
  };

  const CustomDatePicker: React.FC<CustomDatePickerProps>;
  export default CustomDatePicker;
}

declare module "Components/CustomCheckbox" {
  import React from "react";

  export type CustomCheckboxProps = {
    onChange: Function;
    checked: boolean | undefined;
    id?: string;
    disabled?: boolean | undefined;
  };

  const CustomCheckbox: React.FC<CustomCheckboxProps>;
  export default CustomCheckbox;
}

declare module "Components/CustomCheckboxGroup" {
  import React from "react";

  export interface CheckboxOption {
    value: string;
    label: string;
  }
  // Declaring SCSS file imported from the Components project
  declare module 'Components/Style'



  export type CustomCheckboxGroupProps = {
    label: string;
    name: string;
    options: CheckboxOption[];
    onChange?: (selectedValues: string[]) => void;
    defaultChecked?: string[];
  };

  const CustomCheckboxGroup: React.FC<CustomCheckboxGroupProps>;
  export default CustomCheckboxGroup;
}

declare module "Components/CustomRadioGroup" {
  import React from "react";

  export interface RadioOption {
    value: string;
    label: string;
  }

  export type CustomRadioGroupProps = {
    label: string;
    name: string;
    options: RadioOption[];
    onChange?: (selectedValue: string) => void;
    defaultChecked?: string;
  };

  const CustomRadioGroup: React.FC<CustomRadioGroupProps>;
  export default CustomRadioGroup;
}

declare module "Components/CustomToggleSwitch" {
  import React from "react";

  export type CustomToggleSwitchProps = {
    label: string;
    name: string;
    onChange?: (checked: boolean) => void;
    defaultChecked?: boolean;
  };

  const CustomToggleSwitch: React.FC<CustomToggleSwitchProps>;
  export default CustomToggleSwitch;
}
// Declaring SCSS file imported from the Components project
declare module 'Components/Style' {
  const Style: any; // Treat the SCSS file as a string (importing CSS directly)
  export default Style;
}

declare module "Components/PrimaryButton" {
  import React from "react";

  export type PrimaryButtonProps = {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
  };

  const PrimaryButton: React.FC<PrimaryButtonProps>;
  export default PrimaryButton;
}
 


