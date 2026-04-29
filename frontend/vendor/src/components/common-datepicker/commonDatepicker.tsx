import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
const CommonDatePicker: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Calendar
      value={date}
      onChange={(e) => setDate(e.value ?? null)}
      dateFormat="dd M, yy"
      appendTo={document.body} // ✅ fixes popup issue
      className="w-full custom-datepicker"
      inputClassName="form-input w-full bg-light border border-border-color rounded-lg focus:ring-0 focus:outline-none"
    />
  );
};

export default CommonDatePicker;