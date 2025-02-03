import '../../assets/scss/app.scss';
import DatePicker, { DateObject } from "react-multi-date-picker";

export interface datepickerProps {
  value: Date | DateObject | null | undefined;
  onChange: Function;
  id?: string;
}

const CustomDatePicker = (props: datepickerProps) => {
  const { value, onChange, id = "" } = props;
  const formattedValue = value instanceof Date ? new DateObject(value) : value;
  return (
    <div>
      <DatePicker
        value={formattedValue}
        onChange={(e: DateObject | DateObject[] | null) => {
          if (Array.isArray(e)) {
            console.log("Selected multiple dates:", e);
          } else if (e instanceof DateObject) {
            // Log the formatted date or the Date object
            console.log("Formatted date:", e.format("DD/MM/YYYY"));
            console.log("Date object:", e.toDate());
          }

          onChange(e);
        }}
        format="DD/MM/YYYY"
        // maxDate={new Date()}
        id={`datepicker${id}`}
      />
    </div>
  );
};

export default CustomDatePicker;
