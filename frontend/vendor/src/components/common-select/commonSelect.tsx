import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
export type Option = {
  value: string;
  label: string;
};

export interface SelectProps {
  options?: Option[];
  defaultValue?: Option | Option[];
  value?: Option | Option[];
  className?: string;
  ariaLabel?: string;
  placeholder?: string;
  multiple?: boolean;
  id?: string;
  onChange?: (value: Option | Option[] | undefined) => void;
}

const CommonSelect: React.FC<SelectProps> = ({
  options=[],
  defaultValue,
  value,
  className,
  ariaLabel,
  placeholder = "Select",
  multiple = false,
  id,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<Option | Option[] | undefined>(
    defaultValue,
  );

  const selectedValue = value !== undefined ? value : internalValue;

  const handleChange = (e: any) => {
    const newValue = e.value;
    if (onChange) {
      onChange(newValue);
    }
    if (value === undefined) {
      setInternalValue(newValue);
    }
  };

  return (
    <div className={className}>
      <Dropdown
        id={id}
        ariaLabel={ariaLabel}
        value={selectedValue}
        onChange={handleChange}
        options={options}
        optionLabel="label"
        optionValue="value"
        filter // enables in‑dropdown search
        filterBy="label" // search only by label
        placeholder={placeholder}
        className="w-full"
        appendTo="self"
        multiple={multiple}
      />
    </div>
  );
};

export default CommonSelect;
