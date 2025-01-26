import React from "react";

const CommonInput = ({
  label,
  id,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div>
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1 sm:mb-1.5"
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          min={0}
          className="w-full border rounded p-2 outline-none text-sm text-black"
        />
      </div>
    </div>
  );
};

export default CommonInput;
