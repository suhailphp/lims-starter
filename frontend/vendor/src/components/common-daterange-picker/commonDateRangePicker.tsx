import { DateRangePicker } from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useState } from "react";

// Helper to format date as "01 Jan 26"
function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

export default function PredefinedDatePicker() {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0, 0, 0, 0
  );

  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23, 59, 59, 999
  );

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const initialSettings = {
    startDate: startOfToday,
    endDate: endOfToday,
    ranges: {
      "Last 30 Days": [
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29),
        endOfToday,
      ],
      "Last 7 Days": [
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6),
        endOfToday,
      ],
      "Last Month": [startOfLastMonth, endOfLastMonth],
      "This Month": [startOfMonth, endOfMonth],
      Today: [startOfToday, endOfToday],
      Yesterday: [
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999),
      ],
    },
    timePicker: false,
    locale: {
      format: "DD MMM YY",
    },
  };

  const [displayValue, setDisplayValue] = useState(
    `${formatDate(startOfToday)} - ${formatDate(endOfToday)}`
  );

  const handleApply = (_event: any, picker: any) => {
    setDisplayValue(
      `${formatDate(picker.startDate.toDate())} - ${formatDate(
        picker.endDate.toDate()
      )}`
    );
  };

  return (
    <div className="relative w-[198px]">
      <DateRangePicker
        initialSettings={initialSettings}
        onApply={handleApply}
      >
        <div className="relative rangepicker-input w-full cursor-pointer">
          
          {/* Icon */}
          <span className="absolute inset-y-0 left-0 flex items-center px-3 text-muted-foreground">
            <i className="icon-calendar-days" />
          </span>

          {/* Fake Input Styled with Tailwind */}
          <div className="form-input inline-flex items-center w-full bg-light border border-border-color rounded-lg focus:outline-none focus:ring-0 pl-8 pr-3 py-2 text-sm">
            {displayValue}
          </div>

        </div>
      </DateRangePicker>
    </div>
  );
}