import '../../assets/scss/app.scss';
export interface customCheckboxProps {
  onChange: Function;
  checked: boolean | undefined;
  id?: string;
  disabled?: boolean | undefined;
}

const CustomCheckBox = ({
  onChange,
  checked,
  id = "",
  disabled = false,
}: customCheckboxProps) => {
  return (
    <div>
      <label htmlFor={`checkbox-${id}`}>
        <input
          type="checkbox"
          onChange={(e) => onChange(e.target.checked)}
          checked={checked}
          id={`checkbox-${id}`}
          disabled={disabled}
        />
      </label>
    </div>
  );
};

export default CustomCheckBox;
