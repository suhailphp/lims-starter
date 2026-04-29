import { MultiSelect, type MultiSelectChangeEvent } from "primereact/multiselect";

export interface OptionType {
  label: string;
  value: string;
}

interface CommonMultiSelectProps {
  name: string;
  value: OptionType[];
  options: OptionType[];
  onChange: (value: OptionType[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

function CommonMultiSelect({
  name,
  value,
  options,
  onChange,
  placeholder = "Select",
  disabled = false,
  className = "custom-multiselect",
  error,
}: CommonMultiSelectProps) {
  return (
    <div>
      <MultiSelect
        id={name}
        name={name}
        value={value}
        options={options}
        onChange={(e: MultiSelectChangeEvent) => onChange(e.value)}
        optionLabel="label"
        placeholder={placeholder}
        disabled={disabled}
        filter={false}  
        display="chip"
        className={`w-full ${error ? "p-invalid" : ""} ${className}`}
      />
    </div>
  );
}

export default CommonMultiSelect;