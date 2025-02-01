import React, { useState, useEffect, lazy, Suspense } from "react";

const Input = lazy(() => import("Components/Input"));
const TextArea = lazy(() => import("Components/TextArea"));
const SelectDropdown = lazy(() => import("Components/SelectDropdown"));
const PasswordInput = lazy(() => import("Components/PasswordInput"));
const FileUpload = lazy(() => import("Components/FileUpload"));
const CustomDatePicker = lazy(() => import("Components/CustomDatePicker"));
const CustomCheckbox = lazy(() => import("Components/CustomCheckbox"));
const CustomCheckboxGroup = lazy(
  () => import("Components/CustomCheckboxGroup")
);
const CustomRadioGroup = lazy(() => import("Components/CustomRadioGroup"));
const CustomToggleSwitch = lazy(() => import("Components/CustomToggleSwitch"));
const PrimaryButton = lazy(() => import("Components/PrimaryButton"));

const Login: React.FC = () => {
  const [data, setData] = useState<string>(""); // Initialize state as an empty string
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [selectDropdownValue, setselectDropdownValue] =
    useState<Record<string, any>>();
  const [passwordInputValue, setpasswordInputValue] = useState<string>("");
  const [customDatePickerValue, setCustomDatePickerValue] = useState<Date>(
    new Date()
  );
  const [customCheckboxValue, setCustomCheckboxValue] = useState(false);
  const [customCheckboxGroupValue, setCustomCheckboxGroupValue] = useState<
    string[]
  >(["GREEN"]);
  const [customRadioGroupValue, setCustomRadioGroupValue] = useState("car");
  const [customToggleSwitchValue, setCustomToggleSwitchValue] = useState(false);

  const field = {
    fieldName: "Username",
    type: "text",
  };

  // Handle input change and update state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  // Handle input change and update state
  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextAreaValue(event.target.value);
  };

  return (
    <>
    Login Screen
      {/* <Input field={field} onChange={handleChange} />   */}
      <PrimaryButton
        label="Primary button"
        onClick={() => console.log("Primary button clicked")}
      />
      <hr />
      <CustomToggleSwitch
        label="switch"
        name="switch"
        defaultChecked={customToggleSwitchValue}
        onChange={(e) => {
          console.log("swtich: ", e);
        }}
      />
      <hr />
      <CustomRadioGroup
        label="vehicle"
        name="vehicle"
        options={[
          { label: "Car", value: "car" },
          { label: "Bike", value: "bike" },
        ]}
        defaultChecked={customRadioGroupValue}
        onChange={(e) => setCustomRadioGroupValue(e)}
      />
      <hr />
      <CustomCheckboxGroup
        label="checkbox group"
        name="color"
        options={[
          { label: "red", value: "RED" },
          { label: "green", value: "GREEN" },
        ]}
        onChange={(e) => setCustomCheckboxGroupValue(e)}
        defaultChecked={customCheckboxGroupValue}
      />
      <hr />
      <CustomCheckbox
        checked={customCheckboxValue}
        onChange={setCustomCheckboxValue}
        disabled={false}
      />
      <hr />
      <CustomDatePicker
        onChange={(val: any) => setCustomDatePickerValue(val)}
        value={customDatePickerValue}
      />
      <hr />
      <FileUpload
        id="fileUpload"
        label="sample file upload"
        name="fileUpload"
      />
      <hr />
      <PasswordInput
        field={{ fieldName: "Password" }}
        onChange={(e) => setpasswordInputValue(e.target.value)}
      />
      <p>Password: {passwordInputValue}</p>
      <hr />
      <SelectDropdown
        onSelect={(e:any) => {
          setselectDropdownValue(e);
        }}
        options={[
          {
            label: "Sample label 1",
            value: "Sample value 1",
            id: "sample id 1",
          },
          {
            label: "Sample label 2",
            value: "Sample value 2",
            id: "sample id 2",
          },
          {
            label: "Sample label 3",
            value: "Sample value 3",
            id: "sample id 3",
          },
        ]}
      />
      <p>Select dropdown value: {JSON.stringify(selectDropdownValue)}</p>
      <hr />
      <TextArea
        field={{ fieldName: "textarea" }}
        onChange={handleTextAreaChange}
      />
      <p>Text area value: {textAreaValue}</p>
      <hr />
      {/* Pass onChange handler */}
      <Input field={field} onChange={handleChange} />{" "}
      {/* Pass onChange handler */}
      <p>login</p>
      <p>Entered Value: {data}</p> {/* Display entered data */}
      <hr />
    </>
  );
};

export default Login;
