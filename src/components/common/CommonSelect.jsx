import React from "react";

const CommonSelect = ({
  label,
  id,
  options,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div>
      <>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full border rounded p-2 outline-none text-sm cursor-pointer"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>
      </>
    </div>
  );
};

export default CommonSelect;
