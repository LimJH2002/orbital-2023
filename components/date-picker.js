import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = ({ date }) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <Datepicker
      maxDate={new Date(Date.now())}
      useRange={false}
      asSingle={true}
      value={new Date(date)}
      onChange={handleValueChange}
    />
  );
};

export default DatePicker;
