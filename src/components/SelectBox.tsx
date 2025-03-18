import React from "react";

interface SelectBoxProps {
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChange }) => {
  return (
    <select
      onChange={(e) => onChange?.(e.target.value)}
      className="px-3 py-2 border border-gray-600 bg-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
