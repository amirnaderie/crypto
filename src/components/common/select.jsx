import React, { useState } from "react";

const Select = ({
  name,
  label,
  options,
  labelcolor = "text-dark",
  optionlabel,
  optionvalue,
  direction = "rtl",
  coreClass = "col-lg-6",
  error,
  ...rest
}) => {
  const [touched, setTouched] = useState(false);
  return (
    <div className="form-group mb-3">
      <label
        htmlFor={name}
        className={`${direction}==="rtl"?pull-right:"" ${labelcolor} w-100`}
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className={`col-12 ${coreClass}`}
        onBlur={() => setTouched(true)}
      >
        {rest.placeholder && !options && (
          <option disabled>{rest.placeholder}</option>
        )}
        {options &&
          options.map((option) => (
            <option key={option._id} value={option[optionvalue]}>
              {option[optionlabel]}
            </option>
          ))}
      </select>
      {error && (
        <span className="text-danger mx-2">
          <small>{error.message}</small>
        </span>
      )}
    </div>
  );
};

export default Select;
