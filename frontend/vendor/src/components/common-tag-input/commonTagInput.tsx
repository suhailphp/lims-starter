import { useState } from "react";
import { Chips, type ChipsChangeEvent } from "primereact/chips";

export interface CommonTagInputProps {
  id?: string;
  name?: string;
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  max?: number;
  separator?: string;
  allowDuplicate?: boolean;
  onChange?: (value: string[]) => void;
}

const CommonTagInput = ({
  id,
  name,
  value,
  defaultValue = [],
  placeholder = "Add tags",
  disabled = false,
  className = "",
  max,
  separator = ",",
  allowDuplicate = false,
  onChange,
}: CommonTagInputProps) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const selectedValue = value ?? internalValue;

  const handleChange = (event: ChipsChangeEvent) => {
    let nextValue = (event.value ?? []) as string[];

    if (!allowDuplicate) {
      nextValue = [...new Set(nextValue)];
    }

    if (typeof max === "number" && max >= 0) {
      nextValue = nextValue.slice(0, max);
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <Chips
      id={id}
      name={name}
      value={selectedValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      separator={separator}
      className={`w-full ${className}`.trim()}
    />
  );
};

export default CommonTagInput;
